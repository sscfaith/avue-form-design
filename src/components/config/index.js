import Input from './input.vue'
import Textarea from './textarea.vue'
import Number from './number.vue'
import Switch from './switch.vue'
import Rate from './rate.vue'
import Slider from './slider.vue'
import Color from './color.vue'
import Radio from './radio.vue'
import Checkbox from './checkbox.vue'
import Select from './select.vue'
import Cascader from './cascader.vue'
import Tree from './tree.vue'

const components = [
  Input,
  Textarea,
  Number,
  Switch,
  Rate,
  Slider,
  Color,
  Radio,
  Checkbox,
  Select,
  Cascader,
  Tree
]

const Config = {
  install(Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component);
    })
  }
}

export default Config
