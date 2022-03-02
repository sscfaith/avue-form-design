<template>
  <div class="widget-table hover">
    <h3 style="margin: 10px" v-show="column.label">{{ column.label }}</h3>
    <draggable
      class="widget-table__body"
      :list="column.children.column"
      :group="{ name: 'form' }"
      ghost-class="ghost"
      :animation="200"
      handle=".widget-table__item"
      item-key="prop"
      @add="handleWidgetTableAdd($event, column)"
      @end="$emit('change')"
    >
      <template #item="{ element, index }">
        <template v-if="column.children.column.length > 0">
          <div
            class="widget-table__item hover-item drag"
            :class="{ 'active-item': selectWidget.prop == element.prop, required: element.required }"
            :style="{ minWidth: element.width ? `${element.width}px` : '25%', width: element.width ? `${element.width}px` : '25%' }"
            @click.stop="handleWidgetTableSelect(element)"
          >
            <el-table :data="[element]" size="medium" border>
              <el-table-column
                :prop="element.prop"
                :label="element.label"
                :align="column.children.align"
                :header-align="column.children.headerAlign"
              >
                <widget-item :item="element" :params="column.params"></widget-item>
                <widget-button
                  v-if="selectWidget.prop == element.prop"
                  type="table-item"
                  @delete="handleWidgetTableDelete(column, index)"
                  @copy="handleWidgetTableClone(column, element)"
                ></widget-button>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-else>
          <el-empty size="50" style="width: 100%;" description="拖拽字段至此"></el-empty>
        </template>
      </template>
    </draggable>
    <widget-button
      v-if="selectWidget.prop == column.prop"
      type="group"
      @delete="handleWidgetDelete(index)"
      @copy="handleWidgetCloneTable(index)"
      @clear="handleWidgetClear(index)"
    ></widget-button>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import WidgetItem from './item.vue'
import WidgetButton from './button.vue'

export default {
  name: 'widget-table',
  props: ['data', 'column', 'select', 'index'],
  emits: ['update:select', 'change'],
  components: { WidgetItem, WidgetButton, Draggable },
  data() {
    return {
      selectWidget: this.select,
    }
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index]
    },
    handleWidgetClear(index) {
      this.data.column[index].children.column = []
      this.selectWidget = this.data.column[index]
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
    handleWidgetCloneTable(index) {
      let cloneData = this.deepClone(this.data.column[index])
      cloneData.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      cloneData.children.column.forEach(t => {
        t.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      })
      this.data.column.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1)
        this.$emit("change")
      })
    },
    handleWidgetTableAdd(evt, column) {
      let newIndex = evt.newIndex;
      const item = evt.item;

      if (newIndex == 1 && newIndex > column.children.column.length - 1) newIndex = 0
      if (['子表单', '富文本', '坐标拾取器', '分组'].includes(item.textContent)) {
        column.children.column.splice(newIndex, 1)
        return
      }

      const data = this.deepClone(column.children.column[newIndex]);
      if (!data.prop) data.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      data.subfield = true
      delete data.icon
      column.children.column[newIndex] = { ...data }
      this.selectWidget = column.children.column[newIndex]

      this.$emit("change")
    },
    handleWidgetTableSelect(data) {
      this.selectWidget = data
    },
    handleWidgetTableClone(column, item) {
      const data = this.deepClone(item);
      data.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      column.children.column[column.children.column.length] = { ...data }
      this.$nextTick(() => {
        this.selectWidget = column.children.column[column.children.column.length - 1]
        this.$emit("change")
      })
    },
    handleWidgetTableDelete(column, index) {
      if (column.children.column.length - 1 == index) {
        if (index == 0) this.selectWidget = column
        else this.selectWidget = column.children.column[index - 1]
      } else this.selectWidget = column.children.column[index + 1]
      this.$nextTick(() => {
        column.children.column.splice(index, 1)
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
