import { h, RectNode, RectNodeModel } from "@logicflow/core";

class CustomRectModel extends RectNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle();
    // 修改节点的样式
    return style;
  }
}

class customRectView extends RectNode {
  private getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
		'svg',
		{
			x: x - width / 2 + 5,
			y: y - height / 2 + 5,
			width: 25,
			height: 25,
			viewBox: '0 0 1274 1024',
		},
		h('path', {
			fill: style.stroke,
			d: 'M 851.412 806.16 l -90.696 90.32 l -67.696 -67.696 l 90.508 -90.508 c 87.48 -87.48 87.48 -229.308 0 -316.784 c -87.48 -87.48 -229.304 -87.48 -316.784 0 l -90.528 90.528 l -67.88 -67.88 l 90.528 -90.532 c 124.968 -124.968 327.58 -124.968 452.548 0 c 124.968 124.968 124.968 327.58 0 452.548 ZM 172.588 217.84 l 90.696 -90.32 l 67.696 67.696 l -90.508 90.508 c -87.48 87.48 -87.48 229.308 0 316.784 c 87.48 87.48 229.304 87.48 316.784 0 l 90.528 -90.528 l 67.88 67.88 l -90.528 90.532 c -124.968 124.968 -327.58 124.968 -452.548 0 c -124.968 -124.968 -124.968 -327.58 0 -452.548 Z',
		})
	);
    
  }
  //自定义节点外观
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("rect", {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        rx: radius,
        ry: radius,
      }),
      this.getLabelShape()
    ])
  }
}
// 处理器节点
export default {
	type: 'bpmn:processorTask',
	view: customRectView,
	model: CustomRectModel,
  label: '处理器',
  text: '处理器',
	icon: '/node-icon/matcher.svg',
};