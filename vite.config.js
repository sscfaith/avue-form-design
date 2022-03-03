const path = require('path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const config = {
    plugins: [vue()]
  }
  if (mode == 'lib') {
    config.build = {
      cssCodeSplit: true,
      outDir: 'lib',
      lib: {
        entry: path.resolve(__dirname, 'packages/index.js'),
        name: 'AvueFormDesign',
        formats: ['umd'],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'element-plus'],
        output: {
          inlineDynamicImports: true,
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
  return config
})