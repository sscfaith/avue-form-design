import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

import AvueFormDesign from '../packages/index'

const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })
  .use(Avue)
  .use(AvueFormDesign)

app.mount('#app')
