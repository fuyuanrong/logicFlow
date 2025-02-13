import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import FlowDesigner from '../packages/index.ts'

createApp(App).use(FlowDesigner).mount('#app');
