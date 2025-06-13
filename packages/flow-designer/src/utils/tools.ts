import { type IGraphData } from '../types/index';
import { GATEWAY_CUSTOM_ENUM, NODE_CUSTOM_ENUM } from './enum.ts';

export function download(filename: string, text: string) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
// 生成随机码方法
export function generateRandomCode(length: number = 7) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
export function bpmnIdGenerator(type: string, graphData: IGraphData): string {
	let nodeIdArr = graphData?.nodes.map((node) => node.id) || [];
	let edgeIdArr = graphData?.edges.map((edge) => edge.id) || [];
	const allIds = [...nodeIdArr, ...edgeIdArr];
	// 定义内部函数用于生成ID
	function getId(): string {
		let result = '';
		if (NODE_CUSTOM_ENUM.map((i: any) => i.type).includes(type)) {
			result = `ServiceTask_${generateRandomCode()}`;
		} else if (GATEWAY_CUSTOM_ENUM.map((i: any) => i.value)?.includes(type)) {
			result = `Gateway_${generateRandomCode()}`;
		} else if (type === 'bpmn:sequenceFlow') {
			result = `Flow_${generateRandomCode()}`;
		} else if (['bpmn:startEvent', 'bpmn:endEvent'].includes(type)) {
			result = `Event_${generateRandomCode()}`;
		} else {
			result = `Activity_${generateRandomCode()}`;
		}
		return result;
	}
	// 循环生成唯一ID
	let uniqueId: string;
	do {
		uniqueId = getId();
	} while (allIds.includes(uniqueId)); // 如果ID已存在，则重新生成
	return uniqueId;
}
