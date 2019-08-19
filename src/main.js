import Vue from 'vue'
import App from './App'
import AvueFormdesigner from '../packages/';
import AvueUeditor from 'avue-plugin-ueditor'
import AvueMap from 'avue-plugin-map'

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.use(window.AVUE)
Vue.use(AvueFormdesigner)
Vue.use(AvueUeditor)
Vue.use(AvueMap)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
