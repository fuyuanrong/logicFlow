import { h, CircleNode, CircleNodeModel } from '@logicflow/core';

// 结束节点 Model
class EndEventModel extends CircleNodeModel {
	initNodeData(data: any) {
		super.initNodeData(data);
		this.r = 40; // 设置节点半径
	}
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = '#F44336'; // 红色边框
		style.fill = '#FFCDD2'; // 浅红色填充
		return style;
	}
}

// 结束节点 View
class EndEventView extends CircleNode {
	getShape() {
		const { model } = this.props;
		const { x, y, r } = model;
		const style = model.getNodeStyle();
		return h('g', {}, [
			h('circle', {
				...style,
				cx: x,
				cy: y,
				r,
			}),
		]);
	}
}

export default {
	type: 'bpmn:endEvent',
	view: EndEventView,
	model: EndEventModel,
	label: '结束',
	text: '结束',
	icon: '/bpmn-icon/end-event.svg',
};
