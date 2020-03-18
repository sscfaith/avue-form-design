<template>
  <component :is="getComponent(item.type, item.component)"
             v-model="form[item.prop]"
             :item="item"
             :action="item.action"
             :append="item.append"
             :accordion="item.accordion"
             :typeslot="item.typeslot"
             :appendClick="item.appendClick"
             :border="item.border"
             :change="item.change"
             :checked="item.checked"
             :clearable="item.clearable"
             :changeOnSelect="item.changeOnSelect"
             :click="item.click"
             :onRemove="item.onRemove"
             :showWordLimit="item.showWordLimit"
             :colors="item.colors"
             :canvasOption="item.canvasOption"
             :controls-position="item.controlsPosition"
             :dataType="item.dataType"
             :defaultExpandAll="item.defaultExpandAll"
             :defaultTime="item.defaultTime"
             :dic="item.dicData"
             :dicUrl="item.dicUrl"
             :dicMethod="item.dicMethod"
             :dicQuery="item.dicQuery"
             :disabled="item.disabled"
             :drag="item.drag"
             :endPlaceholder="item.endPlaceholder"
             :expand-trigger="item.expandTrigger"
             :filter="item.filter"
             :blur="item.blur"
             :focus="item.focus"
             :tpyeformat="item.tpyeformat"
             :filesize="item.filesize"
             :filterable="item.filterable"
             :format="item.format"
             :formatTooltip="item.formatTooltip"
             :iconClasses="item.iconClasses"
             :label="item.label"
             :limit="item.limit"
             :listType="item.listType"
             :loadText="item.loadText"
             :min="item.min"
             :max="item.max"
             :minlength="item.minlength"
             :maxlength="item.maxlength"
             :minRows="item.minRows"
             :maxRows="item.maxRows"
             :multiple="item.multiple"
             :nodeClick="item.nodeClick"
             :options="item.options"
             :oss="item.oss"
             :parent="item.parent"
             :pickerOptions="item.pickerOptions"
             :placeholder="item.placeholder || getPlaceholder(item)"
             :precision="item.precision"
             :prefixIcon="item.prefixIcon"
             :prepend="item.prepend"
             :prependClick="item.prependClick"
             :prop="item.prop"
             :props="item.props"
             :propsHttp="item.propsHttp"
             :range="item.range"
             :iconList="item.iconList"
             :readonly="item.readonly"
             :checkStrictly="item.checkStrictly"
             :separator="item.separator"
             :showFileList="item.showFileList"
             :showInput="item.showInput"
             :showStops="item.showStops"
             :showAllLevels="item.showAllLevels"
             :showText="item.showText"
             :size="item.size || 'small'"
             :startPlaceholder="item.startPlaceholder"
             :step="item.step"
             :suffixIcon="item.suffixIcon"
             :texts="item.texts"
             :tip="item.tip"
             :type="item.type"
             :accept="item.accept"
             :tags="item.tags"
             :value-format="item.valueFormat"
             :voidIconClass="item.voidIconClass"
             :remote="item.remote"
             :autocomplete="item.autocomplete"
             :allow-create="item.allowCreate"
             :default-first-option="item.defaultFirstOption"
             :is-img="item.isImg"></component>
</template>
<script>
export default {
  name: 'widget-form-item',
  props: ['item'],
  data () {
    return {
      form: {}
    }
  },
  methods: {
    getComponent (type, component) {
      let KEY_COMPONENT_NAME = 'avue-';
      let result = 'input';
      if (!this.validatenull(component)) result = component;
      else if (type === 'array') result = 'array';
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
      else if (type === 'icon-select') result = 'icon-select';
      else if (type === 'color') result = 'color';
      return KEY_COMPONENT_NAME + result;
    },

    getPlaceholder (item) {
      const label = item.label;
      if (['select', 'checkbox', 'radio', 'tree', 'color', 'dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year'].includes(item.type))
        return `请选择${label}`;
      else return `请输入${label}`;
    },
  }
}
</script>