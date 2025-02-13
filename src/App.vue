<template>
  <div class="wrapper">
    <HelloWorld/>
  </div>
</template>
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>
<style scoped>
.wrapper{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
