import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";
class CustomEdgeModel extends PolylineEdgeModel {
	getEdgeStyle() {
		const style = super.getEdgeStyle();
        //重写边样式
        // style.stroke = '#808080';
        style.strokeWidth = 1.5;
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