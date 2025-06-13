//边类型
export const FLOW_TYPE_OPTIONS = [
	{ label: '普通顺序流', value: 'normal' },
	{ label: '默认顺序流', value: 'default' },
	{ label: '条件顺序流', value: 'condition' },
];
//自定义网关
export const GATEWAY_CUSTOM_ENUM = [
	{ label: '互斥网关', value: 'bpmn:exclusiveGateway' },
	{ label: '包容网关', value: 'bpmn:inclusiveGateway' },
	{ label: '并行网关', value: 'bpmn:parallelGateway' },
	{ label: '事件网关', value: 'bpmn:eventBasedGateway' },
	{ label: '复杂网关', value: 'bpmn:complexGateway' },
];
//自定义节点
export const NODE_CUSTOM_ENUM = [{ type: 'bpmn:serviceTask', label: '服务任务' }];

//节点 边  网关 type 枚举
export const NODE_EDGE_TYPE_ENUM: Array<{ [key: string]: any }> = [
	{ type: 'bpmn:startEvent', label: '开始节点' },
	{ type: 'bpmn:endEvent', label: '结束节点' },
	{ type: 'bpmn:sequenceFlow', label: '边' },
	{ type: 'bpmn:complexGateway', label: '复杂网关' },
	{ type: 'bpmn:eventBasedGateway', label: '事件网关' },
	{ type: 'bpmn:exclusiveGateway', label: '互斥网关' },
	{ type: 'bpmn:inclusiveGateway', label: '包容网关' },
	{ type: 'bpmn:parallelGateway', label: '并行网关' },
	{ type: 'bpmn:serviceTask', label: '服务任务' },
];
//服务任务 bpmn：serviceTask 类型
export const SERVICE_TASK_TYPE = [
	//旧值importer
	{ value: 'plugin_dataSource', label: '数据源' },
	//旧值generator
	{ value: 'plugin_recorder', label: '数据集' },
	//旧值matcher
	{ value: 'plugin_processor', label: '处理器' },
];
