import Config from './config'
import FormDesigner from './index.vue'
import fields from './fieldsConfig.js'
export default {
  install (Vue) {
    Vue.use(Config)
    Vue.prototype.fields = fields;
    Vue.component('Avue' + FormDesigner.name, FormDesigner);
  }
}

