import { RectNode, RectNodeModel } from "@logicflow/core";

class CustomRectModel extends RectNodeModel {
  
}

class CustomRectView extends RectNode {
  
}
//自定义节点
export default {
	type: 'custom-rect',
	view: CustomRectView,
	model: CustomRectModel,
	label: '自定义',
	text: '自定义',
	icon: '/bpmn-icon/start-event.svg',
};