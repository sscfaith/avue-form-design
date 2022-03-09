<template>
  <div class="widget-form-container">
    <el-form :label-position="data.labelPosition || 'left'"
             :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px' "
             :label-suffix="data.labelSuffix"
             :model="form"
             ref="widgetForm"
             size="small">
      <el-row :gutter="data.gutter">
        <draggable class="widget-form-list"
                   :list="data.column"
                   :group="{ name: 'form' }"
                   ghost-class="ghost"
                   :animation="300"
                   @add="handleWidgetAdd"
                   @end="$emit('change')">
          <template v-for="(column, index) in data.column">
            <div class="widget-form-table"
                 v-if="column.type == 'dynamic'"
                 :key="index"
                 :class="{ active: selectWidget.prop == column.prop }"
                 @click="handleSelectWidget(index)">
              <widget-form-table :data="data"
                                 :column="column"
                                 :index="index"
                                 :select.sync="selectWidget"
                                 @change="$emit('change')"></widget-form-table>
            </div>
            <div class="widget-form-group"
                 v-else-if="column.type == 'group'"
                 :key="index"
                 :class="{ active: selectWidget.prop == column.prop }"
                 @click="handleSelectWidget(index)">
              <widget-form-group :data="data"
                                 :column="column"
                                 :index="index"
                                 :select.sync="selectWidget"
                                 @change="$emit('change')">
              </widget-form-group>
            </div>
            <el-col v-else
                    :key="index"
                    :md="column.span || 12"
                    :xs="24"
                    :offset="column.offset || 0">
              <el-form-item class="widget-form-item"
                            :label="column.label"
                            :labelWidth="column.labelWidth && (column.labelWidth + 'px')"
                            :prop="column.prop"
                            :class="[{ active: selectWidget.prop == column.prop, 'required': column.required }, 'avue-form__item--' + column.labelPosition || '']"
                            @click.native="handleSelectWidget(index)">
                <widget-form-item :item="column"
                                  :params="column.params"></widget-form-item>
                <el-button title="删除"
                           @click.stop="handleWidgetDelete(index)"
                           class="widget-action-delete"
                           v-if="selectWidget.prop == column.prop"
                           circle
                           plain
                           size="small"
                           type="danger">
                  <i class="iconfont icon-delete"></i>
                </el-button>
                <el-button title="复制"
                           @click.stop="handleWidgetClone(index)"
                           class="widget-action-clone"
                           v-if="selectWidget.prop == column.prop"
                           circle
                           plain
                           size="small"
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
import WidgetFormItem from './WidgetFormItem'
import WidgetFormTable from './WidgetFormTable'
import WidgetFormGroup from './WidgetFormGroup'
import Draggable from 'vuedraggable'

export default {
  name: 'widget-form',
  components: { Draggable, WidgetFormItem, WidgetFormTable, WidgetFormGroup },
  props: ['data', 'select'],
  data () {
    return {
      selectWidget: this.select,
      form: {}
    }
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.column[index]
    },
    handleWidgetAdd (evt) {
      const newIndex = evt.newIndex
      const data = this.deepClone(this.data.column[newIndex])
      if (!data.prop) data.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      delete data.icon
      delete data.subfield
      if (data.type == 'title') {
        delete data.label
        this.form[data.prop] = data.value
      }
      this.$set(this.data.column, newIndex, data)
      this.handleSelectWidget(newIndex)

      this.$emit("change")
    },
    handleWidgetDelete (index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {}
        else this.handleSelectWidget(index - 1)
      } else this.handleSelectWidget(index + 1)

      this.$nextTick(() => {
        this.data.column.splice(index, 1)
        this.$emit("change")
      })
    },
    handleWidgetClone (index) {
      let cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      this.data.column.push(cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(this.data.column.length - 1)
        this.$emit("change")
      })
    },
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
