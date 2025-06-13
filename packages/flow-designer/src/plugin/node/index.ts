import CustomRect from './CustomRect'; // 自定义节点
import StartEvent from './StartEvent'; // 开始节点
import EndEvent from './EndEvent'; // 结束节点
import ExclusiveGateway from './ExclusiveGateway'; // 排他网关节点
import InclusiveGateway from './InclusiveGateway'; // 包容网关节点
import ParallelGateway from './ParallelGateway'; // 并行网关节点
import EventBasedGateway from './EventBasedGateway'; // 事件网关节点
import ComplexGateway from './ComplexGateway'; // 复杂网关节点

export default [StartEvent, EndEvent, CustomRect, ExclusiveGateway, InclusiveGateway, ParallelGateway, EventBasedGateway, ComplexGateway];
