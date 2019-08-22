<template>
  <div class="widget-form-container">
    <el-form :label-position="data.labelPosition || 'left'"
             :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px' "
             :label-suffix="data.labelSuffix"
             :model="form"
             ref="widgetForm">
      <el-row :gutter="data.gutter">
        <draggable class="widget-form-list"
                   :list="data.column"
                   :group="{ name: 'form' }"
                   ghost-class="ghost"
                   :animation="300"
                   @add="handleWidgetAdd">
          <template v-for="(column, index) in data.column">
            <div class="widget-form-table"
                 v-if="column.type == 'dynamic'"
                 :key="index"
                 :class="{ active: selectWidget.prop == column.prop }"
                 @click="handleSelectWidget(index)">
              <h3 style="margin: 10px"
                  v-show="column.label">{{column.label}}</h3>
              <draggable class="widget-form-table__content"
                         :list="column.children.column"
                         :group="{ name: 'form' }"
                         ghost-class="ghost"
                         :animation="200"
                         handle=".widget-form-table__item"
                         @add="handleWidgetTableAdd($event, column)">
                <template v-if="column.children.column.length > 0">
                  <div v-for="(item, tableIndex) in column.children.column"
                       :key="tableIndex"
                       class="widget-form-table__item"
                       :class="{ active: selectWidget.prop == item.prop, required: item.required }"
                       :style="{minWidth: item.width ? `${item.width}px`: '33.3%', width: item.width ? `${item.width}px`: '33.3%'}"
                       @click.stop="handleWidgetTableSelect(item)">
                    <el-table :data="[item]"
                              border>
                      <el-table-column :prop="item.prop"
                                       :label="item.label"
                                       :align="column.children.align"
                                       :header-align="column.children.headerAlign">
                        <component :is="getComponent(item.type, item.component)"
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
                                   :column="item"
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
                                   :placeholder="getPlaceholder(item)"
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
                                   v-model="form[item.prop]"
                                   :allow-create="item.allowCreate"
                                   :default-first-option="item.defaultFirstOption"></component>
                        <el-button title="删除"
                                   @click.stop="handleWidgetTableDelete(column, tableIndex)"
                                   class="widget-table-action-delete"
                                   v-if="selectWidget.prop == item.prop"
                                   circle
                                   plain
                                   type="danger">
                          <i class="iconfont icon-delete"></i>
                        </el-button>
                        <el-button title="复制"
                                   @click.stop="handleWidgetTableClone(column, item)"
                                   class="widget-table-action-clone"
                                   v-if="selectWidget.prop == item.prop"
                                   circle
                                   plain
                                   type="primary">
                          <i class="iconfont icon-copy"></i>
                        </el-button>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
                <template v-else>
                  <avue-empty :size="50"
                              style="width: 100%;"
                              desc="拖拽字段至此"></avue-empty>
                </template>
              </draggable>
              <el-button title="删除"
                         @click.stop="handleWidgetDelete(index)"
                         class="widget-action-delete"
                         v-if="selectWidget.prop == column.prop"
                         circle
                         plain
                         type="danger">
                <i class="iconfont icon-delete"></i>
              </el-button>
              <el-button title="清空"
                         @click.stop="handleWidgetClear(index)"
                         class="widget-action-clear"
                         v-if="selectWidget.prop == column.prop"
                         circle
                         plain
                         type="warning">
                <i class="iconfont icon-clear"></i>
              </el-button>
              <el-button title="复制"
                         @click.stop="handleWidgetCloneTable(index)"
                         class="widget-action-clone"
                         v-if="selectWidget.prop == column.prop"
                         circle
                         plain
                         type="primary">
                <i class="iconfont icon-copy"></i>
              </el-button>
            </div>
            <el-col v-else
                    :key="index"
                    :md="column.span || 12"
                    :xs="24"
                    :offset="column.offset || 0">
              <el-form-item class="widget-form-item"
                            :label="column.label"
                            :prop="column.prop"
                            :class="{ active: selectWidget.prop == column.prop, 'required': column.required }"
                            @click.native="handleSelectWidget(index)">
                <component :is="getComponent(column.type, column.component)"
                           :action="column.action"
                           :append="column.append"
                           :accordion="column.accordion"
                           :typeslot="column.typeslot"
                           :appendClick="column.appendClick"
                           :border="column.border"
                           :change="column.change"
                           :checked="column.checked"
                           :clearable="column.clearable"
                           :changeOnSelect="column.changeOnSelect"
                           :click="column.click"
                           :onRemove="column.onRemove"
                           :showWordLimit="column.showWordLimit"
                           :column="column"
                           :colors="column.colors"
                           :canvasOption="column.canvasOption"
                           :controls-position="column.controlsPosition"
                           :dataType="column.dataType"
                           :defaultExpandAll="column.defaultExpandAll"
                           :defaultTime="column.defaultTime"
                           :dic="column.dicData"
                           :dicUrl="column.dicUrl"
                           :dicMethod="column.dicMethod"
                           :dicQuery="column.dicQuery"
                           :disabled="column.disabled"
                           :drag="column.drag"
                           :endPlaceholder="column.endPlaceholder"
                           :expand-trigger="column.expandTrigger"
                           :filter="column.filter"
                           :blur="column.blur"
                           :focus="column.focus"
                           :tpyeformat="column.tpyeformat"
                           :filesize="column.filesize"
                           :filterable="column.filterable"
                           :format="column.format"
                           :formatTooltip="column.formatTooltip"
                           :iconClasses="column.iconClasses"
                           :label="column.label"
                           :limit="column.limit"
                           :listType="column.listType"
                           :loadText="column.loadText"
                           :min="column.min"
                           :max="column.max"
                           :minlength="column.minlength"
                           :maxlength="column.maxlength"
                           :minRows="column.minRows"
                           :maxRows="column.maxRows"
                           :multiple="column.multiple"
                           :nodeClick="column.nodeClick"
                           :options="column.options"
                           :oss="column.oss"
                           :parent="column.parent"
                           :pickerOptions="column.pickerOptions"
                           :placeholder="getPlaceholder(column)"
                           :precision="column.precision"
                           :prefixIcon="column.prefixIcon"
                           :prepend="column.prepend"
                           :prependClick="column.prependClick"
                           :prop="column.prop"
                           :props="column.props"
                           :propsHttp="column.propsHttp"
                           :range="column.range"
                           :iconList="column.iconList"
                           :readonly="column.readonly"
                           :checkStrictly="column.checkStrictly"
                           :separator="column.separator"
                           :showFileList="column.showFileList"
                           :showInput="column.showInput"
                           :showStops="column.showStops"
                           :showAllLevels="column.showAllLevels"
                           :showText="column.showText"
                           :size="column.size || 'small'"
                           :startPlaceholder="column.startPlaceholder"
                           :step="column.step"
                           :suffixIcon="column.suffixIcon"
                           :texts="column.texts"
                           :tip="column.tip"
                           :type="column.type"
                           :accept="column.accept"
                           :tags="column.tags"
                           :value-format="column.valueFormat"
                           :voidIconClass="column.voidIconClass"
                           :remote="column.remote"
                           :autocomplete="column.autocomplete"
                           v-model="form[column.prop]"
                           :allow-create="column.allowCreate"
                           :default-first-option="column.defaultFirstOption"></component>
                <el-button title="删除"
                           @click.stop="handleWidgetDelete(index)"
                           class="widget-action-delete"
                           v-if="selectWidget.prop == column.prop"
                           circle
                           plain
                           type="danger">
                  <i class="iconfont icon-delete"></i>
                </el-button>
                <el-button title="复制"
                           @click.stop="handleWidgetClone(index)"
                           class="widget-action-clone"
                           v-if="selectWidget.prop == column.prop"
                           circle
                           plain
                           type="primary">
                  <i class="iconfont icon-copy"></i>
                </el-button>
              </el-form-item>
            </el-col>
          </template>
        </draggable>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: 'widget-form',
  components: { Draggable },
  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select,
      form: {}
    }
  },
  methods: {
    getComponent (type, component) {
      let KEY_COMPONENT_NAME = 'avue-';
      let result = 'input';
      if (!this.validatenull(component)) {
        result = component;
      } else if (type === 'select') {
        result = 'select';
      } else if (type === 'radio') {
        result = 'radio';
      } else if (type === 'checkbox') {
        result = 'checkbox';
      } else if (['time', 'timerange'].includes(type)) {
        result = 'time';
      } else if (
        [
          'dates',
          'date',
          'datetime',
          'datetimerange',
          'daterange',
          'week',
          'month',
          'year'
        ].includes(type)
      ) {
        result = 'date';
      } else if (type === 'cascader') {
        result = 'cascader';
      } else if (type === 'number') {
        result = 'input-number';
      } else if (type === 'password') {
        result = 'input';
      } else if (type === 'switch') {
        result = 'switch';
      } else if (type === 'rate') {
        result = 'rate';
      } else if (type === 'upload') {
        result = 'upload';
      } else if (type === 'slider') {
        result = 'slider';
      } else if (type === 'dynamic') {
        result = 'dynamic';
      } else if (type === 'icon-select') {
        result = 'icon-select';
      } else if (type === 'color') {
        result = 'color';
      }
      return KEY_COMPONENT_NAME + result;
    },
    getPlaceholder (column) {
      const label = column.label;
      if (['select', 'checkbox', 'radio', 'tree', 'color', 'date', 'time'].includes(column.type)) {
        return `请选择${label}`;
      } else {
        return `请输入${label}`;
      }
    },
    handleSelectWidget (index) {
      this.selectWidget = this.data.column[index]
    },
    handleWidgetAdd (evt) {
      const newIndex = evt.newIndex;
      const data = this.deepClone(this.data.column[newIndex]);
      if (!data.prop) data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      delete data.icon
      delete data.subfield
      this.$set(this.data.column, newIndex, { ...data })
      this.handleSelectWidget(newIndex)
    },
    handleWidgetClear (index) {
      this.data.column[index].children.column = []
      this.selectWidget = this.data.column[index]
    },
    handleWidgetDelete (index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {}
        else this.handleSelectWidget(index - 1)
      } else this.handleSelectWidget(index + 1)

      this.$nextTick(() => {
        this.data.column.splice(index, 1)
      })
    },
    handleWidgetClone (index) {
      let cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      this.data.column.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1)
      })
    },
    handleWidgetCloneTable (index) {
      let cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      cloneData.children.column.forEach(t => {
        t.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      })
      this.data.column.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1)
      })
    },
    handleWidgetTableAdd (evt, column) {
      let newIndex = evt.newIndex;
      const item = evt.item;

      if (newIndex == 1 && newIndex > column.children.column.length - 1) newIndex = 0
      if (['子表单', '富文本', '坐标拾取器', '上传', '滑块'].includes(item.textContent)) {
        column.children.column.splice(newIndex, 1)
        return
      }

      const data = this.deepClone(column.children.column[newIndex]);
      if (!data.prop) data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      data.subfield = true
      delete data.icon
      this.$set(column.children.column, newIndex, { ...data })
      this.selectWidget = column.children.column[newIndex]
    },
    handleWidgetTableSelect (data) {
      this.selectWidget = data
    },
    handleWidgetTableClone (column, item) {
      const data = this.deepClone(item);
      data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
      this.$set(column.children.column, column.children.column.length, { ...data })
      this.$nextTick(() => {
        this.selectWidget = column.children.column[column.children.column.length - 1]
      })
    },
    handleWidgetTableDelete (column, index) {
      if (column.children.column.length - 1 == index) {
        if (index == 0) this.selectWidget = column
        else this.selectWidget = column.children.column[index - 1]
      } else this.selectWidget = column.children.column[index + 1]
      this.$nextTick(() => {
        column.children.column.splice(index, 1)
      })
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
