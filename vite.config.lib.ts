import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './lib',
    lib: {
      entry: './packages/index.ts', // 打包入口
      name: 'FlowDesigner',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
    }
  }
})
