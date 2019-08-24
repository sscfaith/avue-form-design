import Config from './config'
import FormDesign from './index.vue'
import fields from './fieldsConfig.js'

export default {
  install (Vue) {
    Vue.use(Config)
    Vue.prototype.fields = fields;
    Vue.prototype.getConfigByType = getConfigByType
    Vue.component('Avue' + FormDesign.name, FormDesign);
  }
}

const getConfigByType = (type) => {
  return new Promise((resolve, reject) => {
    fields.forEach(field => {
      field.list.forEach(config => {
        if (config.type == type) resolve(config)
      })
    })
    reject()
  })
}
