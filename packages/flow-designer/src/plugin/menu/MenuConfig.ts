import type LogicFlow from '@logicflow/core';
import { ElMessage } from 'element-plus';

// 重置菜单
export default function resetMenu(lf: LogicFlow | null) {
	return {
		nodeMenu: [
			{
				text: '删除',
				icon: true,
				className: 'lf-menu-delete',
				callback(node: { id: string }) {
					lf?.deleteNode(node.id);
				},
			},
			{
				text: '复制',
				icon: true,
				className: 'lf-menu-copy',
				callback(node: { id: string }) {
					lf?.cloneNode(node.id);
				},
			},
			{
				text: '添加任务',
				icon: true,
				className: 'lf-menu-rect',
				callback(node: { type: string; x: number; y: number; id: string }) {
					if (node.type === 'bpmn:endEvent') {
						ElMessage.error('结束节点不能添加任务');
						return;
					}
					//判断 节点是否已有节点连接 解决多次点击添加任务节点造成重叠显示不明显问题
					const nodeOutgoning: Array<any> = lf?.getNodeOutgoingNode(node.id) || [];
					//需要偏移的偏移量
					const offset = nodeOutgoning?.length * 10;
					//第一步添加节点 addNode
					const nodeModel: any = lf?.addNode({
						type: 'bpmn:serviceTask',
						x: node.x + 200 + offset,
						y: node.y + offset,
						text: { x: node.x + 200 + offset, y: node.y + offset, value: '' },
						properties: {
							
						},
					});
					//第二步添加连线 addEdge
					nodeModel?.id &&
						lf?.addEdge({
							type: 'bpmn:sequenceFlow',
							sourceNodeId: node.id,
							targetNodeId: nodeModel?.id,
						});
					nodeModel?.setSelected(true);
					lf?.getNodeModelById(node.id)?.setSelected(false);
				},
			},
			{
				text: '添加网关',
				icon: true,
				className: 'lf-menu-rhombus',
				callback(node: { type: string; x: number; y: number; id: string }) {
					if (node.type === 'bpmn:endEvent') {
						ElMessage.error('结束节点不能添加网关');
						return;
					}
					//判断 节点是否已有节点连接 解决多次点击添加任务节点造成重叠显示不明显问题
					const nodeOutgoning: Array<any> = lf?.getNodeOutgoingNode(node.id) || [];
					//需要偏移的偏移量
					const offset = nodeOutgoning?.length * 10;
					//第一步添加网关 addNode
					const nodeModel: any = lf?.addNode({
						type: 'bpmn:exclusiveGateway',
						x: node.x + 200 + offset,
						y: node.y + offset,
						text: { x: node.x + 200 + offset, y: node.y + offset, value: '互斥网关' },
					});
					//第二步添加连线 addEdge
					nodeModel?.id &&
						lf?.addEdge({
							type: 'bpmn:sequenceFlow',
							sourceNodeId: node.id,
							targetNodeId: nodeModel?.id,
						});
					nodeModel?.setSelected(true);
					lf?.getNodeModelById(node.id)?.setSelected(false);
				},
			},
			{
				text: '添加结束节点',
				icon: true,
				className: 'lf-menu-end',
				callback: (node: { type: string; x: number; y: number; id: string }) => {
					if (node.type === 'bpmn:endEvent') {
						ElMessage.error('结束节点不能添加结束节点');
						return;
					}
					//判断 节点是否已有节点连接 解决多次点击添加任务节点造成重叠显示不明显问题
					const nodeOutgoning: Array<any> = lf?.getNodeOutgoingNode(node.id) || [];
					//需要偏移的偏移量
					const offset = nodeOutgoning?.length * 10;
					//第一步添加节点 addNode
					const nodeModel: any = lf?.addNode({
						type: 'bpmn:endEvent',
						x: node.x + 200 + offset,
						y: node.y + offset,
						text: { x: node.x + 200 + offset, y: node.y + offset, value: '结束' },
					});
					//第二步添加连线 addEdge
					nodeModel?.id &&
						lf?.addEdge({
							type: 'bpmn:sequenceFlow',
							sourceNodeId: node.id,
							targetNodeId: nodeModel?.id,
						});
				},
			},
		],
		edgeMenu: [
			{
				text: '删除',
				icon: true,
				className: 'lf-menu-delete',
				callback(node: { id: string }) {
					// node为该节点数据
					lf?.graphModel?.deleteEdgeById(node.id);
				},
			},
		],
		graphMenu: [],
	};
}
