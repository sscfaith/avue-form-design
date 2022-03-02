import AvueFormDesign from './index.vue'
import AvueFormDesignConfig from './components/config/components/index'

export default {
  install(Vue) {
    Vue.use(AvueFormDesignConfig)
    Vue.component('avue-form-design', AvueFormDesign);
  }
}
