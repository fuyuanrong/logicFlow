
export type ExtraPropsType = {
	/**
	 * retainedAttrsFields retainedAttrsFields会和默认的defaultRetainedProperties:
	 * ["properties", "startPoint", "endPoint", "pointsList"]合并
	 * 这意味着出现在这个数组里的字段当它的值是数组或是对象时不会被视为一个节点而是一个属性
	 */
	retainedAttrsFields?: string[];

	/**
	 * excludeFields会和默认的defaultExcludeFields合并，
	 * 出现在这个数组中的字段在导出时会被忽略
	 */
	excludeFields?: {
		in?: Set<string>;
		out?: Set<string>;
	};

	/**
	 * transformer是一个数组，数组中的每一项都是一个对象，对象中包含in和out两个属性
	 * in函数接收两个参数key 和 data，key为当前处理对象的key也就是节点名称，data为当前对象，当导入时会调用这个函数，对被导入数据进行处理，得到我们期望的数据
	 * out函数接收一个参数data，data为当前处理节点数据，当导出时会调用这个函数，对需要导出的数据进行处理，得到我们期望的数据
	 */
	transformer?: {
		[key: string]: {
			in?: (key: string, data: any) => any;
			out?: (data: any) => any;
		};
	};

	mapping?: {
		in?: {
			[key: string]: string;
		};
		out?: {
			[key: string]: string;
		};
	};
};
