import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";
class CustomEdgeModel extends PolylineEdgeModel {
	getEdgeStyle() {
		const style = super.getEdgeStyle();
		const { properties } = this;
		//重写边样式
		// style.stroke = '#808080';
		// style.strokeWidth = 1.5;
		if (properties.sequenceFlowType === 'condition' || properties.condition) {
			style.strokeDasharray = '4 4';
		}
		return style;
	}
}

class CustomEdge extends PolylineEdge {
    
}


export default {
	type: 'bpmn:sequenceFlow',
    model: CustomEdgeModel,
    view: CustomEdge
};