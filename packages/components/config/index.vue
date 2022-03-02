<template>
  <div class="config">
    <el-tabs v-model="configTab" stretch>
      <el-tab-pane label="字段属性" name="widget" style="padding: 0 10px;">
        <widget-config :data="widgetSelect" :default-values="defaultValues"></widget-config>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="form" lazy style="padding: 0 10px;">
        <form-config :data="form"></form-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue"

const props = defineProps({
  form: {
    type: Object,
    default: () => {
      return {}
    }
  },
  widgetSelect: {
    type: Object,
    default: () => {
      return {}
    }
  },
  defaultValues: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// Tabs
let configTab = ref('form')

// WidgetConfig
import WidgetConfig from './widget.vue'
let { widgetSelect } = toRefs(props)
watch(widgetSelect, () => {
  configTab.value = 'widget'
}, { deep: true })

// FormConfig
import FormConfig from './form.vue'

</script>
<style lang="scss" scoped>
.config {
  height: calc(100% - 5px);
  padding-top: 5px;
  background: #fff;
  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }

  :deep(.el-tabs) {
    width: 100%;
    height: 100%;

    .el-tabs__header {
      margin: 0;
      height: 45px;
      background: #ffffff;
      z-index: 1000;
      position: relative;
      display: block;
      top: 0;
    }

    .el-tabs__content {
      height: calc(100% - 45px);
      overflow-y: auto;
      margin-top: 0;
    }
  }

  :deep(ul) {
    margin: 0;
    padding: 0;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      width: 100%;

      .ghost {
        list-style: none;
        font-size: 0;
        height: 35px;
      }
    }
  }
}
</style>