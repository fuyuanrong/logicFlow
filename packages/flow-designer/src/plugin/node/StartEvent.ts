import { h, CircleNode, CircleNodeModel } from '@logicflow/core';

// 开始节点 Model
class StartEventModel extends CircleNodeModel {
	getConnectedTargetRules() {
		const rules = super.getConnectedTargetRules();
		const notAsTarget: any = {
			message: '起始节点不能作为边的终点',
			validate: () => false,
		};
		rules.push(notAsTarget);
		return rules;
	}
	initNodeData(data: any) {
		super.initNodeData(data);
		this.r = 40; // 设置节点半径
		//开始节点不能直接连结束节点
		const endEventNotAsTarget: any = {
			message: '开始节点不能直接连结束节点',
			validate: (sourceNode: { type: string }, targetNode: { type: string }) => {
				return sourceNode.type !== 'bpmn:startEvent' || targetNode.type !== 'bpmn:endEvent';
			},
		};
		this.sourceRules.push(endEventNotAsTarget);
	}
	getNodeStyle() {
		const style = super.getNodeStyle();
		style.stroke = '#4CAF50'; // 绿色边框
		style.fill = '#C8E6C9'; // 浅绿色填充
		return style;
	}
}

// 开始节点 View
class StartEventView extends CircleNode {
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
	type: 'bpmn:startEvent',
	view: StartEventView,
	model: StartEventModel,
	label: '开始',
	text: '开始',
	icon: '/bpmn-icon/start-event.svg',
};
