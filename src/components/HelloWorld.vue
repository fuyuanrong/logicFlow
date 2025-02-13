<template>
	<div class="container">
		<div class="btn">
			<button @click="getFlow">获取流程</button>
		</div>
		<div class="card">
			<FlowDesigner ref="flowDesignerRef" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import getTestXml from '../assets/getTestXml.ts'


let flowDesignerRef = ref()
function getFlow() {
  flowDesignerRef.value?.renderData(getTestXml())
}
</script>
<style scoped>
.container{
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container .btn{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.card {
  width: 1500px;
  height: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
