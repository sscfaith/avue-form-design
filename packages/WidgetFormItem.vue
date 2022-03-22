<template>
  <div>
    <div v-if="item.type == 'title'"
         :style="item.styles"
         style="margin-left: 5px;">
      {{item.value}}
    </div>
    <component v-else
               :is="getComponent(item.type, item.component)"
               v-bind="vBind"
               :multiple="false"
               :placeholder="item.placeholder || getPlaceholder(item)"
               :value="['time', 'timerange', 'checkbox'].includes(item.type) ? item.dicData: undefined">
      <span v-if="params.html"
            v-html="params.html"></span>
    </component>
  </div>
</template>
<script>
export default {
  name: 'widget-form-item',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    vBind() {
      const vBind = Object.assign(this.deepClone(this.item), this.params, {
        size: this.item.size || 'small',
        dic: this.item.dicData ? this.item.dicData.map(d => {
          if (!this.item.props) return d
          const { label, value, desc } = this.item.props
          if (!label || !value) return d
          return {
            [label]: d.label,
            [value]: d.value,
            [desc]: d.desc
          }
        }) : undefined,
        rules: this.item.pattern ? this.item.rules.map(r => {
          if (r.pattern) r.pattern = new RegExp(this.item.pattern)
          return r
        }) : this.item.rules
      })
      let event = ['change', 'blur', 'click', 'focus']
      event.forEach(e => delete vBind[e])
      if (vBind.event) delete vBind.event
      return vBind
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    getComponent(type, component) {
      let KEY_COMPONENT_NAME = 'avue-';
      let result = 'input';
      if (component) return component
      else if (['array', 'img', 'url'].includes(type)) result = 'array';
      else if (type === 'select') result = 'select';
      else if (type === 'radio') result = 'radio';
      else if (type === 'checkbox') result = 'checkbox';
      else if (['time', 'timerange'].includes(type)) result = 'time';
      else if (['dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year'].includes(type))
        result = 'date';
      else if (type === 'cascader') result = 'cascader';
      else if (type === 'number') result = 'input-number';
      else if (type === 'password') result = 'input';
      else if (type === 'switch') result = 'switch';
      else if (type === 'rate') result = 'rate';
      else if (type === 'upload') result = 'upload';
      else if (type === 'slider') result = 'slider';
      else if (type === 'dynamic') result = 'dynamic';
      else if (type === 'icon') result = 'input-icon';
      else if (type === 'color') result = 'input-color';
      else if (type === 'map') result = 'input-map';
      return KEY_COMPONENT_NAME + result;
    },
    getPlaceholder(item) {
      const label = item.label;
      if (['select', 'checkbox', 'radio', 'tree', 'color', 'dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year', 'map', 'icon'].includes(item.type))
        return `请选择 ${label}`;
      else return `请输入 ${label}`;
    },
  }
}
</script>