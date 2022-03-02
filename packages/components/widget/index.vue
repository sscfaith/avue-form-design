<template>
  <el-main
    class="widget"
    :style="{ background: data.column && data.column.length == 0 ? `url(${widgetEmptyImg}) no-repeat 50%` : '' }"
  >
    <el-form
      :label-position="data.labelPosition || 'left'"
      :label-width="data.labelWidth ? `${data.labelWidth}px` : '100px'"
      :label-suffix="data.labelSuffix"
      :model="form"
      :size="data.size"
      ref="widgetForm"
    >
      <el-row :gutter="data.gutter">
        <draggable
          class="widget-list"
          :list="data.column"
          :group="{ name: 'form' }"
          ghost-class="ghost"
          :animation="300"
          item-key="prop"
          @add="handleWidgetAdd"
          @end="$emit('change')"
        >
          <template #item="{ element, index }">
            <widget-table
              v-if="element.type == 'dynamic'"
              :class="{ active: selectWidget.prop == element.prop }"
              @click="handleSelectWidget(index)"
              :data="data"
              :column="element"
              :index="index"
              v-model:select="selectWidget"
              @change="$emit('change')"
            ></widget-table>
            <widget-group
              v-else-if="element.type == 'group'"
              :class="{ active: selectWidget.prop == element.prop }"
              @click="handleSelectWidget(index)"
              :data="data"
              :column="element"
              :index="index"
              v-model:select="selectWidget"
              @change="$emit('change')"
            ></widget-group>
            <el-col
              v-else
              style="width: 100%;"
              :md="element.span || 12"
              :xs="24"
              :offset="element.offset || 0"
            >
              <el-form-item
                class="widget-item hover drag"
                :label="element.label"
                :prop="element.prop"
                :size="data.size || element.size"
                :class="{ active: selectWidget.prop == element.prop, 'required': element.required }"
                :label-width="element.labelWidth"
                @click="handleSelectWidget(index)"
              >
                <widget-item :item="element" :params="element.params"></widget-item>
                <widget-button
                  v-if="selectWidget.prop == element.prop"
                  @delete="handleWidgetDelete(index)"
                  @copy="handleWidgetClone(index)"
                ></widget-button>
              </el-form-item>
            </el-col>
          </template>
        </draggable>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import widgetEmptyImg from '../../assets/widget-empty.png' // 空白图片

import Draggable from 'vuedraggable'
import WidgetItem from './item.vue'
import WidgetTable from './table.vue'
import WidgetGroup from './group.vue'
import WidgetButton from './button.vue'

export default {
  name: 'widget',
  components: { Draggable, WidgetItem, WidgetTable, WidgetGroup, WidgetButton },
  props: ['data', 'select'],
  emits: ['update:select', 'change'],
  data() {
    return {
      widgetEmptyImg,
      selectWidget: this.select,
      form: {}
    }
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index]
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex
      const data = this.deepClone(this.data.column[newIndex])
      if (!data.prop) data.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      delete data.icon
      delete data.subfield
      if (data.type == 'title') {
        delete data.label
        this.form[data.prop] = data.value
      }
      this.data.column[newIndex] = data
      this.handleSelectWidget(newIndex)

      this.$emit("change")
    },
    handleWidgetDelete(index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {}
        else this.handleSelectWidget(index - 1)
      } else this.handleSelectWidget(index + 1)

      this.$nextTick(() => {
        this.data.column.splice(index, 1)
        this.$emit("change")
      })
    },
    handleWidgetClone(index) {
      let cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      this.data.column.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1)
        this.$emit("change")
      })
    },
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>