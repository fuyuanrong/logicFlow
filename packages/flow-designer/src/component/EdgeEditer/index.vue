<template>
	<div class="edge-editer">
		<div class="form-item">
			<div class="prefix-label">顺序流类型</div>
			<el-select v-model="edgeProps.sequenceFlowType" class="form-select" placeholder="请选择顺序流类型" clearable>
				<el-option v-for="item in FLOW_TYPE_OPTIONS" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
        <div class="form-item" v-if="edgeProps.sequenceFlowType === 'condition'">
			<div class="prefix-label">条件表达式</div>
            <el-input v-model="edgeProps.condition" class="form-input" placeholder="请输入条件表达式" clearable></el-input>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { FLOW_TYPE_OPTIONS } from '../../utils/enum';
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    nodeData: {
        type: Object,
        default: () => ({})
    }
})
const emits = defineEmits(['update:modelValue']);
let edgeProps = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})
</script>

<style lang="scss" scoped>
.edge-editer{
    color: #909399;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .form-item{
        display: flex;
        flex-direction: row;
        .prefix-label{
            display: table-cell;
            border: 1px solid #DCDFE6;
            border-right: 0;
            border-radius: 4px 0 0 4px;
            color: #909399;
            background-color: #F5F7FA;
            white-space: nowrap;
            line-height: 30px;
            font-size: 14px;
            width: 100px;
            box-sizing: border-box;
            text-align: center;
        }
        .form-select{
            flex: 1;
            display: table-cell;
            line-height: normal;
            :deep(.el-select__wrapper) {
                border-radius: 0 4px 4px 0;
                line-height: normal;
            }
        }
        .form-input{
            flex: 1;
            display: table-cell;
            line-height: normal;
            :deep(.el-input__wrapper){
                // width: 100%;
                border-radius: 0 4px 4px 0;
                line-height: normal;
                width: -webkit-fill-available;
            }
        }
    }
}
</style>
