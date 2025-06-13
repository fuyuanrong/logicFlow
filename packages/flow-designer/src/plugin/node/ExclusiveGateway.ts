import LogicFlow, { PolygonNode, PolygonNodeModel } from '@logicflow/core';

// 自定义节点的 Model
class ExclusiveGatewayModel extends PolygonNodeModel {
	// 设置节点类型
	getNodeType() {
		return 'bpmn:exclusiveGateway';
	}

	// 设置节点形状为菱形
	initNodeData(data: LogicFlow.NodeConfig<LogicFlow.PropertiesType>) {
		super.initNodeData(data);
		const width = 100; // 菱形的宽度
		const height = 100; // 菱形的高度
		this.points = [
			[width / 2, 0], // 上顶点
			[width, height / 2], // 右顶点
			[width / 2, height], // 下顶点
			[0, height / 2], // 左顶点
		];
	}

	// 设置节点样式
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = '#333'; // 边框颜色
		style.fill = '#fff'; // 填充颜色
		return style;
	}
}

// 自定义节点的 View
class ExclusiveGatewayView extends PolygonNode {
	// 可以在这里自定义节点的渲染逻辑
}


//自定义节点
export default {
	type: 'bpmn:exclusiveGateway',
	view: ExclusiveGatewayView,
	model: ExclusiveGatewayModel,
	label: '互斥网关',
	text: '互斥网关',
	icon: '/bpmn-icon/exclusive-gateway.svg',
};
