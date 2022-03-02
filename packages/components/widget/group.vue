<template>
  <div class="widget-group hover">
    <h4 class="widget-group__head" v-show="column.label">
      <i :class="column.icon" v-show="column.icon" style="margin-right: 10px;"></i>
      {{ column.label }}
    </h4>
    <draggable
      class="widget-group__body"
      :list="column.children.column"
      :group="{ name: 'form' }"
      ghost-class="ghost"
      :animation="200"
      item-key="prop"
      @add="handleWidgetGroupAdd($event, column)"
      @end="$emit('change')"
    >
      <template #item="{ element, index }">
        <widget-table
          v-if="element.type == 'dynamic'"
          :class="{ active: selectWidget.prop == element.prop }"
          @click.stop="handleWidgetTableSelect(element)"
          :data="column.children"
          :column="element"
          :index="index"
          v-model:select="selectWidget"
          @change="$emit('change')"
        ></widget-table>
        <div v-else :style="{width: `${element.span / 24 * 100}%`, float: 'left'}">
          <el-form-item
            class="widget-group__item hover drag"
            :label="element.label"
            :prop="element.prop"
            :class="{ 'active-item': selectWidget.prop == element.prop, 'required': element.required }"
            @click.stop="handleWidgetTableSelect(element)"
          >
            <widget-item :item="element" :params="column.params"></widget-item>
            <widget-button
              v-if="selectWidget.prop == element.prop"
              type="group-item"
              @delete="handleWidgetTableDelete(column, index)"
              @copy="handleWidgetTableClone(column, element)"
            ></widget-button>
          </el-form-item>
        </div>
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
import WidgetTable from './table.vue'
import WidgetButton from './button.vue'

export default {
  name: 'widget-group',
  components: { WidgetItem, WidgetTable, WidgetButton, Draggable },
  props: ['data', 'column', 'select', 'index'],
  emits: ['update:select', 'change'],
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
    handleWidgetGroupAdd(evt, column) {
      let newIndex = evt.newIndex;
      const item = evt.item;

      if (newIndex == 1 && newIndex > column.children.column.length - 1) newIndex = 0
      if (['分组'].includes(item.textContent)) {
        column.children.column.splice(newIndex, 1)
        return
      }

      const data = this.deepClone(column.children.column[newIndex]);
      if (!data.prop) data.prop = 'a' + Date.now() + Math.ceil(Math.random() * 99999)
      delete data.icon
      if (data.type == 'dynamic') data.span = 24
      else data.span = 12
      column.children.column[newIndex] = { ...data }
      this.selectWidget = column.children.column[newIndex]

      this.$emit("change")
    }
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