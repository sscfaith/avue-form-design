import Custom from './custom.vue'
import Input from './input.vue'
import Textarea from './textarea.vue'
import Number from './number.vue'
import Dynamic from './dynamic.vue'
import Switch from './switch.vue'
import Rate from './rate.vue'
import Slider from './slider.vue'
import Color from './color.vue'
import Select from './select.vue'
import Tree from './tree.vue'
import Date from './date.vue'
import Upload from './upload.vue'
import UEditor from './ueditor.vue'
import Map from './map.vue'
import Group from './group.vue'
import Array from './array.vue'
import Title from './title.vue'
import Event from './event.vue'
import Table from './table/index.vue'

const components = [
  Custom,
  Input,
  Textarea,
  Number,
  Dynamic,
  Switch,
  Rate,
  Slider,
  Color,
  Select,
  Tree,
  Date,
  UEditor,
  Upload,
  Map,
  Group,
  Array,
  Title,
  Event,
  Table
]

const Config = {
  install (Vue) {
    if (this.installed) return
    this.installed = true

    components.map(component => {
      Vue.component(component.name, component);
    })
  }
}

export default Config
