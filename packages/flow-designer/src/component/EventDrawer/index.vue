<template>
	<div class="drawer-wrapper">
		<el-drawer v-model="drawer" direction="rtl" :size=" isCustomEdge() || isCustomGataway() ? '30%' : '60%'" destroy-on-close>
			<template #header>
				<h4>{{ showType }}</h4>
			</template>
			<template #default>
				<div class="content">
					<div class="common" :style="{ 'flex-direction': (isCustomEdge() || isCustomGataway()) ? 'column' : 'row' }">
						<div class="node-info" v-if="isCustomGataway()">
							<label for="">网关类型：</label>
							<el-select v-model="nodeTypeValue" placeholder="请选择网关类型" @change="handleNodeTypeChange" clearable>
								<el-option v-for="item in GATEWAY_CUSTOM_ENUM" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
						<!-- 自定义节点使用插件名称 -->
						<div class="node-info">
							<label v-if="isCustomEdge()">边名称：</label>
							<label v-else>节点名称：</label>
							<el-input v-model="nodeTextValue" clearable placeholder="请输入名称"></el-input>
						</div>
					</div>

					<div class="editer-box" v-if="isCustomEdge()">
						<EdgeEditer :nodeData="nodeInfo" v-model="nodeProperties"/>
					</div>
				</div>
			</template>
			<template #footer>
				<div style="flex: auto">
					<el-button @click="cancelClick">取消</el-button>
					<el-button type="primary" @click="confirmClick">确认</el-button>
				</div>
			</template>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, inject, ref, type Ref } from 'vue';
import { NODE_EDGE_TYPE_ENUM, NODE_CUSTOM_ENUM, GATEWAY_CUSTOM_ENUM } from '../../utils/enum.ts';
const EdgeEditer =  defineAsyncComponent(() => import('../EdgeEditer/index.vue'));

const LF = inject<any>('LF');
let drawer = ref(false as boolean);
let nodeInfo = ref({} as Record<string, any>);
let nodeTextValue: Ref<string> = ref('');
let nodeProperties = ref({} as Record<string, any>);
let nodeTypeValue = ref('' as string);

//header 标题处理
let showType: Ref<string> = computed(() => {
	let type = nodeInfo.value?.type;
	if (!type) return '未知节点';
	let nodeLabel = NODE_EDGE_TYPE_ENUM.find((i: Record<string, any>) => i.type === type)?.label;
	return nodeLabel;
})
//判断是否是自定义节点
function isCustomNode(): boolean {
	const nodeType = nodeInfo.value?.type as string;
    return NODE_CUSTOM_ENUM.some( (i:{type:string}) => i.type === nodeType );
}
//判断是否是自定义网关
function isCustomGataway(): boolean {
	const type = nodeInfo.value?.type as string;
    return GATEWAY_CUSTOM_ENUM.some( (i:{value:string}) => i.value === type );
}
//判断是否是自定义边
function isCustomEdge(): boolean {
	const type = nodeInfo.value?.type as string;
    return type === 'bpmn:sequenceFlow';
}

function handleNodeTypeChange(data: string) {
	if (GATEWAY_CUSTOM_ENUM.find((item: { value: string; }) => item.value === data)) {
		nodeTextValue.value = GATEWAY_CUSTOM_ENUM.find((item: { value: string; }) => item.value === data)?.label || '';
	}
}

function openDrawer(data: Record<string, any>) {
	console.log(data);
    drawer.value = true;
	nodeInfo.value = data;
	nodeTypeValue.value = data?.type;
	nodeTextValue.value = data?.text?.value || '';
	nodeProperties.value = data?.properties || {};
	// 边处理
	if (nodeInfo.value?.type === 'bpmn:sequenceFlow') {
		nodeProperties.value.sequenceFlowType = data?.properties?.sequenceFlowType || 'normal';
		let { sourceNodeId } = data;
		let sourceNode = LF.value?.getNodeDataById(sourceNodeId) || {};
		if(data?.id === sourceNode?.properties?.default) {
			nodeProperties.value.sequenceFlowType = 'default';
		}
		if (data?.properties?.condition) {
			nodeProperties.value.sequenceFlowType = 'condition';
		}
	}
}
function closeDrawer() {
    drawer.value = false;
}
function cancelClick() {
    drawer.value = false;
}

function confirmClick() {

	//更新节点或者边的文案
	handleUpdateText(nodeTextValue.value)
	if (isCustomNode()) {
		nodeProperties.value.name = nodeTextValue.value;
	}
	//更新节点或者边的属性
	handleUpdateProperties(nodeProperties.value)
	//当修改的对象为 边 时处理
	handleEdgeLinkChange();
	//修改节点类型
	handleUpdateNodeType();
	drawer.value = false;
	// console.log(LF.value?.getGraphData());
}

//更新节点或者边的文案
function handleUpdateText(data: string) {
	LF.value?.updateText(nodeInfo.value.id, data)
}
//更新节点（包括网关节点）或边的 properties
function handleUpdateProperties(data: Record<string, any>) {
	LF.value?.setProperties(nodeInfo.value.id, data)
}

// 边修改顺序流类型联动处理  顺序流类型 条件表达式处理
function handleEdgeLinkChange() {
	let data: any = nodeProperties.value?.sequenceFlowType || undefined;
	//当前操作节点
	let { type, id, sourceNodeId } = nodeInfo.value;
    if (type != 'bpmn:sequenceFlow' || !sourceNodeId  || !id) return;
    //获取网关节点信息
    let sourceNode = LF.value?.getNodeDataById(sourceNodeId);
    // console.log(sourceNode);
    if (!GATEWAY_CUSTOM_ENUM.map((i: { value: any; })=>i.value).includes(sourceNode?.type)) return;
    //当边设置为默认顺序流时 对应的网关节点设置属性default 为该边的id
    if (data === 'default') {
        LF.value.updateProperties(sourceNodeId, { default: id })
		LF.value.deleteProperty(id, 'condition');
    }
    if (data === 'normal' || !data) {
        LF.value.updateProperties(sourceNodeId, { default: null });
		LF.value.deleteProperty(id, 'condition');
    }
    if (data === 'condition') {

    }
}
// 修改网关类型
function handleUpdateNodeType() {
	if (!nodeTypeValue.value || nodeInfo.value.type === nodeTypeValue.value) return;
	LF.value?.changeNodeType(nodeInfo.value.id, nodeTypeValue.value);
	//当修改网关类型时 清除网关所连接的边
	if (GATEWAY_CUSTOM_ENUM.map((i: { value: any; })=>i.value).includes(nodeInfo.value.type)) {
		LF.value?.deleteEdgeByNodeId({
			sourceNodeId: nodeInfo.value.id
		});
	}
}


defineExpose({
	openDrawer,
	closeDrawer
})
</script>

<style scoped lang="scss">
:deep(.el-drawer__header) {
	margin-bottom: 0;
	h4{
		font-weight: 400;
		color: #000;
	}
}
.drawer-wrapper .content{
	height: 100%;
	width: 	100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	.common{
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding-bottom: 10px;
		gap: 20px;
	}
	.node-info{
		display: flex;
		flex-direction: row;
		align-items: center;
		label{
			width: 80px;
			color: grey;
			font-size: 14px;
		}
		.el-input, .el-select{
			width: 240px;
		}
	}
	.editer-box{
		flex: 1;
	}
}
</style>
