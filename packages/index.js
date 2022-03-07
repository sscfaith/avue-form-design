import AvueFormDesign from './index.vue'
import AvueFormDesignConfig from './components/config/components/index'

import { getAsVal } from './utils/index.js'

export default {
  install(Vue) {
    Vue.use(AvueFormDesignConfig)
    Vue.component('avue-form-design', AvueFormDesign)

    Vue.config.globalProperties.getAsVal = getAsVal
  }
}
