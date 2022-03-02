<template>
  <div class="field">
    <div v-for="field in fields">
      <div class="title">{{ field.title }}</div>
      <draggable
        class="field-group"
        tag="ul"
        :list="field.list"
        :group="{ name: 'form', pull: 'clone', put: false }"
        ghost-class="ghost"
        :sort="false"
        item-key="label"
      >
        <template #item="{ element }">
          <li class="field-item" @click="$emit('field-click', element)">
            <i class="icon iconfont" :class="element.icon || 'icon-info'"></i>
            <span>{{ element.title || element.label }}</span>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue"
import Draggable from 'vuedraggable'

// Props
const props = defineProps({
  customFields: Array, // 自定义字段
  includeFields: { // 显示字段
    type: Array,
    default: () => {
      const arr = []
      field.forEach(f => {
        f.list.forEach(c => {
          arr.push(c.type)
        })
      })
      return arr
    }
  },
})

// Emits
defineEmits(['field-click'])

// Icon
const { proxy } = getCurrentInstance()
proxy.loadScript('css', 'https://at.alicdn.com/t/font_1254447_zc9iezc230c.css')

// Fields
import field from "./index"
const { customFields, includeFields } = props
const fields = computed(() => {
  const arr = []
  if (customFields && customFields.length > 0) {
    const cf = customFields[0]
    if (cf.title && cf.list && cf.list.length > 0) arr.push(customFields)
    else arr.push({
      title: '自定义字段',
      list: customFields
    })
  }
  field.forEach(f => {
    if (f.list.find(ff => includeFields.includes(ff.type))) arr.push(f)
  })
  return arr
})
</script>

<style lang="scss" scoped>
@import "../../styles/theme.scss";
.field {
  padding: 10px 0;
  width: 100%;
  height: 100%;
  background: #fff;

  .title {
    padding: 8px 12px;
    font-size: 13px;
  }

  .field-group {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;

    .field-item {
      font-size: 12px;
      width: 47%;
      margin: 1%;
      position: relative;
      padding: 5px 0;
      float: left;
      left: 0;
      color: #333;
      border: 1px solid #f4f6fc;
      display: flex;
      align-items: center;
      cursor: move;
      background: #f4f6fc;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        color: $primary-color;
        outline: 1px dashed $primary-color;
      }

      .icon {
        margin-right: 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>