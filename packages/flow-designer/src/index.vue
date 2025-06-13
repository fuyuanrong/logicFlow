<template>
	<div id="container" ref="container"></div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref } from "vue";
import LogicFlow from "@logicflow/core";
import '@logicflow/core/dist/index.css';
import CustomNode from "./plugin/node/index";
import CustomEdge from "./plugin/edge/index";
import CustomDnd from './plugin/menu/DndPanel';
import { DndPanel, Control, Menu, BPMNAdapter  } from '@logicflow/extension';
import '@logicflow/extension/lib/style/index.css';
import resetMenu from './plugin/menu/MenuConfig.ts';
import extraProps from './utils/extraProps';
import type { ExtraPropsType } from "./types/ExtraPropsType";
import { download, bpmnIdGenerator } from './utils/tools';
import CustomTheme from './plugin/theme/custom';
// 拖拽面板
LogicFlow.use(DndPanel)
//控制面板
LogicFlow.use(Control)
// 注册插件
LogicFlow.use(BPMNAdapter, extraProps as unknown as ExtraPropsType);
// 注册菜单
LogicFlow.use(Menu);

const container = ref<HTMLElement>();
const LF = ref<LogicFlow>()
provide('LF', LF)

function init()  {
    if (!container.value) return;
    LF.value = new LogicFlow({
        container: container.value,
        grid: true,
        type: 'dot',
        edgeTextDraggable: true,
        stopScrollGraph: true,
        stopZoomGraph: true,    // 节点拖拽结束后，自动吸附
        autoFocus: true,   //节点拖拽结束后，自动吸附
        // plugins: [DndPanel, Menu, BPMNElements, BPMNAdapter]
        style: {
            // 设置默认样式（主题）
            baseEdge: {
                stroke: '#000',
                strokeWidth: 1.5,
            },
        },
        idGenerator: (args: any) => {
            let graphData = LF.value?.getGraphRawData() as any;
            // type: 当前元素类型（如 'bpmn:exclusiveGateway'）
            return bpmnIdGenerator(args, graphData);
        },
    })
    //设置主题
    LF.value?.setTheme(CustomTheme)
    // 注册自定义节点
    if (Array.isArray(CustomNode) && LF.value) {
        CustomNode?.forEach(item => {
            LF.value?.register(item)
        })
    }
    //注册自定义边
    if (Array.isArray(CustomEdge) && LF.value) {
        CustomEdge?.forEach(item => {
            LF.value?.register(item)
        })
    }
    //设置添加的默认边类型
    LF.value?.setDefaultEdgeType('bpmn:sequenceFlow');
    //设置左侧拖拽面板dndPanel
    (LF.value?.extension.dndPanel as DndPanel)?.setPatternItems(CustomDnd);
    //重置菜单
    (LF.value?.extension.menu as Menu)?.setMenuConfig(resetMenu(LF.value));
    //控制面板增加功能
    //下载XML
    (LF.value?.extension.control as Control)?.addItem({
        key: 'download',
        iconClass: 'custom-icon custom-download',
        title: '下载XML',
        text: '下载',
        onClick: () => {
            // if (!LF || !LF.adapterOut || !LF.adapterIn) return;
            const xmlResult: any = LF.value?.adapterOut && LF.value?.adapterOut(LF.value?.getGraphRawData() as any);
            download("logic-flow.bpmn", xmlResult); // 触发下载
        }
    });
    //清空画布
    (LF.value?.extension.control as Control)?.addItem({
        key: 'clear',
        iconClass: 'custom-icon custom-clear',
        title: '清空画布',
        text: '清空',
        onClick: () => {
            LF.value?.clearData();
        }
    })

    // 渲染流程图数据
    setTimeout(() => {
        LF.value?.render({});
    }, 0);

    // 监听事件
    const { eventCenter } = LF.value.graphModel;
    eventCenter.on('node:click', (args: any) => {
        console.log('节点：' + args.data.text.value);
        console.log(args);
    })
}

// 渲染流程图数据
function renderData(data: LogicFlow.GraphConfigData) {
    if (!LF.value || !LF.value.adapterIn || !LF.value.render) return;
    LF.value?.clearData();
    let graphData = LF.value?.adapterIn(data);
    console.log(graphData);
    let { edges, nodes } = graphData;
    try {
        LF.value?.renderRawData({ edges, nodes });
    } catch (error) {
        alert(error)
        console.log(error);
    }
}
//渲染 graphData数据
function renderRawData(graphData: LogicFlow.GraphConfigData) {
    if (!LF.value || !LF.value.render) return;
    let { edges, nodes } = graphData;
    try {
        LF.value?.renderRawData({ edges, nodes });
    } catch (error: any) {
        alert(error.message)
    }

}
//获取 graphData数据
function getRawData() {
    return LF.value?.getGraphData();
}
//获取XML数据
function getXmlData() {
    let graphData = LF.value?.getGraphRawData() as LogicFlow.GraphData;
    return LF.value?.adapterOut && LF.value?.adapterOut(graphData,  extraProps as unknown as ExtraPropsType);
}
onMounted(() => {
    init();
})
defineExpose({ renderData, renderRawData, getRawData, getXmlData })
onBeforeUnmount(() => {
    //移除所有监听事件
    const { eventCenter } = LF.value?.graphModel || {};
    eventCenter?.off('')
})
</script>
<style scoped>
#container{
    width: 100%;
    height: 100%;
}
</style>
