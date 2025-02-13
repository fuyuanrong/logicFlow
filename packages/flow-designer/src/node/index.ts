import CustomRect from "./CustomRect";      // 自定义节点
import DataImport from "./DataImport";      // 数据源节点
import DataSoruce from './DataSoruce';      // 数据集节点
import Processor from './Processor';        // 处理器节点
import StartEvent from './StartEvent';  // 开始节点
import EndEvent from './EndEvent';      // 结束节点
import ExclusiveGateway from './ExclusiveGateway';      // 排他网关节点

export default [StartEvent, EndEvent, CustomRect, DataImport, DataSoruce, Processor, ExclusiveGateway];