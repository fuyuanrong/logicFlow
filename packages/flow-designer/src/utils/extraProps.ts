export default {
	retainedAttrsFields: ['plugin'],
	/**
	 * excludeFields会和默认的defaultExcludeFields合并，
	 * 出现在这个数组中的字段在导出时会被忽略
	 */
	excludeFields: {
		out: new Set([]),
	},
	/**
	 * transformer是一个数组，数组中的每一项都是一个对象，对象中包含in和out两个属性
	 * in函数接收两个参数key 和 data，key为当前处理对象的key也就是节点名称，data为当前对象，当导入时会调用这个函数，对被导入数据进行处理，得到我们期望的数据
	 * out函数接收一个参数data，data为当前处理节点数据，当导出时会调用这个函数，对需要导出的数据进行处理，得到我们期望的数据
	 */
	transformer: {
		'bpmn:sequenceFlow': {
			out(data: { properties: { expressionType: any; condition: any; sequenceFlowType: any } }) {
				const {
					properties: { expressionType, condition },
				} = data;
				delete data.properties.condition;
				delete data.properties.expressionType;
				delete data.properties.sequenceFlowType;
				if (condition) {
					if (expressionType === 'cdata') {
						return {
							json: `<bpmn:conditionExpression xsi:type="bpmn:tFormalExpression"><![CDATA[\${${condition}}]]></bpmn:conditionExpression>`,
						};
					}
					return {
						json: `<bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${condition}</bpmn:conditionExpression>`,
					};
				}
				return {
					json: '',
				};
			},
		},
		'bpmn:serviceTask': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				delete data.properties.nodeType;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 80;
				data.properties.width = 100;
				return data;
			},
		},
		'bpmn:startEvent': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 80;
				data.properties.width = 80;
				return data;
			},
		},
		'bpmn:endEvent': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 80;
				data.properties.width = 80;
				return data;
			},
		},
		'bpmn:exclusiveGateway': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 100;
				data.properties.width = 100;
				return data;
			},
		},
		'bpmn:inclusiveGateway': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 100;
				data.properties.width = 100;
				return data;
			},
		},
		'bpmn:parallelGateway': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 100;
				data.properties.width = 100;
				return data;
			},
		},
		'bpmn:eventBasedGateway': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 100;
				data.properties.width = 100;
				return data;
			},
		},
		'bpmn:complexGateway': {
			out(data: { properties: any }) {
				delete data.properties.height;
				delete data.properties.width;
				return data;
			},
			in(_key: string, data: { properties: any }) {
				data.properties.height = 100;
				data.properties.width = 100;
				return data;
			},
		},
		'bpmn:conditionExpression': {
			in(_key: string, data: any) {
				let condition = '';
				let expressionType = '';
				if (data['#cdata-section']) {
					expressionType = 'cdata';
					condition = /^\$\{(.*)\}$/g.exec(data['#cdata-section'])?.[1] || '';
				} else if (data['#text']) {
					expressionType = 'normal';
					condition = data['#text'];
				}
				return {
					'-condition': condition,
					'-expressionType': expressionType,
					'-sequenceFlowType': 'condition',
				};
			},
		},
	},
};
