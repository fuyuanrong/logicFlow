<template>
	<div id="container" ref="container"></div>
</template>
<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import LogicFlow from "@logicflow/core";
import '@logicflow/core/dist/index.css';
import CustomNode from "./node/index";
import CustomEdge from "./edge/index";
// import { DndPanel, Menu, BPMNElements, BPMNAdapter } from '@logicflow/extension'
import { DndPanel, Control, Menu, BPMNAdapter  } from '@logicflow/extension';
import '@logicflow/extension/lib/style/index.css';

// 拖拽面板
LogicFlow.use(DndPanel)
//控制面板
LogicFlow.use(Control)
// 注册插件
LogicFlow.use(BPMNAdapter);
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
    })
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

    //设置左侧拖拽面板dndPanel
    (LF.value?.extension.dndPanel as DndPanel)?.setPatternItems(CustomNode);
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
    LF.value.render({})

    // 监听事件
    const { eventCenter } = LF.value.graphModel;
    eventCenter.on('node:click', (args: any) => {
        console.log('节点：' + args.data.text.value);
        console.log(args);
    })
}
function download(filename: string, text: string) {
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

// 渲染流程图数据
function renderData(data: LogicFlow.GraphConfigData) {
    if (!LF.value || !LF.value.adapterIn || !LF.value.render) return;
    LF.value?.clearData();
    let graphData = LF.value?.adapterIn(data);
    console.log(graphData);
    let { edges, nodes } = graphData;

    edges.forEach((data:any) => {
        data.startPoint = data.pointsList[0];
        data.endPoint = data.pointsList[data.pointsList.length - 1];
    })
    nodes.forEach((data: any) => {
        // 自定义节点bug 处理  但是找不到原因
        let isCostom = ['bpmn:dataImportTask', 'bpmn:processorTask', "bpmn:dataSoruceTask"].some(item => item === data.type)
        if (!isCostom) return;
        data.x = data.x + (data.properties.width/2);
        data.y = data.y + (data.properties.height/2);
    })
    LF.value?.renderRawData({ edges, nodes });
    // LF.value?.renderRawData(graphData)
}
onMounted(() => {
    init();
})
defineExpose({renderData})
</script>
<style scoped>
#container{
    width: 100%;
    height: 100%;
}
</style>
