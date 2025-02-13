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
			d: 'M519.68 1016.32a26.88 26.88 0 0 1-15.36-4.48l-407.68-235.52a30.08 30.08 0 0 1-16-26.88V278.4a30.08 30.08 0 0 1 16-26.88L504.32 16a30.72 30.72 0 0 1 31.36 0l407.68 235.52a30.72 30.72 0 0 1 15.36 26.88v471.04a30.72 30.72 0 0 1-15.36 26.88l-407.68 235.52a28.8 28.8 0 0 1-16 4.48z m-375.68-285.44l375.68 217.6 376.32-217.6V296.96L519.68 80 144 296.96z M519.68 540.8a28.16 28.16 0 0 1-15.36-4.48l-407.68-230.4a31.36 31.36 0 0 1-12.16-42.88 32.64 32.64 0 0 1 43.52-12.16l407.04 231.04a31.36 31.36 0 0 1-15.36 58.88z M512 545.28a31.36 31.36 0 0 1-15.36-58.88L901.12 256a31.36 31.36 0 0 1 42.88 12.16 32 32 0 0 1-12.16 42.88l-407.68 230.4a32 32 0 0 1-12.16 3.84z M519.68 1000.96a31.36 31.36 0 0 1-31.36-31.36V501.12a31.36 31.36 0 1 1 64 0v468.48a31.36 31.36 0 0 1-32.64 31.36z',
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
//数据集节点
export default {
	type: 'bpmn:dataSoruceTask',
	view: customRectView,
	model: CustomRectModel,
  label: '数据集',
  text: '数据集',
	icon: '/node-icon/generator.svg',
};