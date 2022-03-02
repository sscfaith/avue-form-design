<template>
  <div class="avue-form-design">
    <el-container>
      <el-aside :width="leftAsideWidth">
        <!-- 左侧字段区 -->
        <afd-field
          :include-fields="includeFields"
          :custom-fields="customFields"
          @field-click="handleFieldClick"
        ></afd-field>
      </el-aside>
      <el-container direction="vertical">
        <!-- 头部工具栏 -->
        <afd-toolbar
          :toolbar="toolbar"
          :undo-redo="undoRedo"
          :show-github-star="showGithubStar"
          :history-steps="historySteps"
          @undo="widget.option = handleUndo()"
          @redo="widget.option = handleRedo()"
          @import="$refs.importDrawer.show()"
          @generate="handleGenerateJson"
          @preview="handlePreview"
          @clear="handleClear"
        ></afd-toolbar>
        <!-- 主设计区 -->
        <afd-widget
          ref="widgetForm"
          :data="widget.option"
          v-model:select="widget.select"
          @change="handleHistoryChange(widget.option)"
        ></afd-widget>
      </el-container>
      <el-aside :width="rightAsideWidth">
        <!-- 右侧设计区 -->
        <afd-config
          :form="widget.option"
          :widget-select="widget.select"
          :default-values="defaultValues"
        ></afd-config>
      </el-aside>
    </el-container>

    <!-- 导入JSON弹窗 -->
    <afd-import-drawer ref="importDrawer" @submit="handleImportJson"></afd-import-drawer>
    <!-- 生成JSON弹窗 -->
    <afd-generate-drawer ref="generateDrawer"></afd-generate-drawer>
    <!-- 预览弹窗 -->
    <afd-preview-drawer ref="previewDrawer"></afd-preview-drawer>
  </div>
</template>
<script setup>
import { computed, getCurrentInstance, onMounted, reactive, toRef, watch } from "vue"

const props = defineProps({
  options: {
    type: [Object, String],
    default: () => {
      return {
        column: []
      }
    }
  },
  storage: {
    type: Boolean,
    default: false
  },
  asideLeftWidth: {
    type: [String, Number],
    default: '270px'
  },
  asideRightWidth: {
    type: [String, Number],
    default: '380px'
  },
  showGithubStar: {
    type: Boolean,
    default: true
  },
  toolbar: {
    type: Array,
  },
  undoRedo: {
    type: Boolean,
    default: true
  },
  includeFields: {
    type: Array,
  },
  customFields: {
    type: Array,
  },
  defaultValues: {
    type: Object,
  },
})

// =================初始化数据================= START
import useTransform from "./composables/use-transform" // json转换
import useHistory from "./composables/use-history" // 历史记录
const { historySteps, initHistory, handleHistoryChange, handleUndo, handleRedo } = useHistory()
const { transformToAvueOptions, transAvueOptionsToFormDesigner } = useTransform()

const widget = reactive({
  option: {
    column: [],
    labelPosition: 'left',
    labelSuffix: '：',
    labelWidth: 120,
    gutter: 0,
    menuBtn: true,
    submitBtn: true,
    submitText: '提交',
    emptyBtn: true,
    emptyText: '清空',
    menuPosition: 'center'
  },
  select: {}
})

const options = toRef(props, 'options')
watch(options, (val) => {
  let options = val
  if (typeof options == 'string') {
    try {
      options = eval('(' + options + ')')
    } catch (e) {
      console.error('非法配置')
      options = { column: [] }
    }
  }
  transAvueOptionsToFormDesigner(options).then(res => {
    widget.option = { ...widget.option, ...res }
  })
}, { deep: true })

const handleLoadStorage = () => {
  let option = options.value
  if (typeof option == 'string') {
    try {
      option = eval('(' + option + ')')
    } catch (e) {
      console.error('非法配置')
      option = { column: [] }
    }
  }
  if (!option.column) option.column = []

  const storage = toRef(props, 'storage')
  transAvueOptionsToFormDesigner({ ...widget.option, ...option }).then(res => {
    widget.option = initHistory({
      index: 0,
      maxStep: 20,
      steps: [res],
      storage: storage.value
    })
  })

  const undoRedo = toRef(props, 'undoRedo')
  if (undoRedo.value) {
    window.addEventListener('keydown', (evt) => {
      // 监听 cmd + z / ctrl + z 撤销
      if ((evt.metaKey && !evt.shiftKey && evt.keyCode == 90) || (evt.ctrlKey && !evt.shiftKey && evt.keyCode == 90)) {
        widget.option = handleUndo()
      }

      // 监听 cmd + shift + z / ctrl + shift + z / ctrl + y 重做
      if ((evt.metaKey && evt.shiftKey && evt.keyCode == 90) || (evt.ctrlKey && evt.shiftKey && evt.keyCode == 90) || (evt.ctrlKey && evt.keyCode == 89)) {
        widget.option = handleRedo()
      }
    }, false)
  }
}
onMounted(() => {
  handleLoadStorage()
})
// =================初始化数据================= END

// =================左侧字段================= START
import AfdField from './components/field/index.vue' // 左侧字段区

const { proxy, ctx } = getCurrentInstance()

const asideLeftWidth = toRef(props, 'asideLeftWidth')
const leftAsideWidth = computed(() => {
  return (asideLeftWidth.value + '').includes('px') ? asideLeftWidth.value : asideLeftWidth.value + 'px'
})
// 左侧字段点击
const handleFieldClick = (item) => {
  const activeIndex = widget.option.column.findIndex(c => c.prop == widget.select.prop) + 1
  let newIndex = 0
  if (activeIndex == -1) {
    widget.option.column.push(item)
    newIndex = widget.option.column.length - 1
  } else {
    widget.option.column.splice(activeIndex, 0, item)
    newIndex = activeIndex
  }

  ctx.$refs.widgetForm.handleWidgetAdd({ newIndex })
}
// =================左侧字段================= END

// =================顶部工具栏操作================= START
import AfdToolbar from './components/toolbar/index.vue' // 顶部工具栏
import AfdWidget from './components/widget/index.vue' // 中间主设计区

import AfdImportDrawer from './components/widget/drawer/import.vue' // 导入弹窗
import AfdGenerateDrawer from './components/widget/drawer/generate.vue' // 生成弹窗
import AfdPreviewDrawer from './components/widget/drawer/preview.vue' // 预览弹窗

// 导入JSON
const handleImportJson = (json, done) => {
  if (!json) return
  try {
    transAvueOptionsToFormDesigner(json).then(data => {
      widget.option = data
      handleHistoryChange(data)
      done()
    })
  } catch (e) {
    proxy.$message.error(e.message)
  }
}

// 生成JSON
const handleGenerateJson = () => {
  transformToAvueOptions(widget.option).then(data => {
    ctx.$refs.generateDrawer.show(data)
  })
}
// 预览
const handlePreview = () => {
  if (!widget.option.column || widget.option.column.length == 0) proxy.$message.error("没有需要展示的内容")
  else ctx.$refs.previewDrawer.show(data)
}
// 清空
const handleClear = () => {
  if (widget.option && widget.option.column && widget.option.column.length > 0) {
    proxy.$confirm('确定要清空吗？', '警告', {
      type: 'warning'
    }).then(() => {
      widget.option.column = []
      widget.select = {}
      handleHistoryChange(widget.option)
    }).catch(() => {
    })
  } else proxy.$message.error("没有需要清空的内容")
}
// =================顶部工具栏================= END

// =================右侧配置区================= START
import AfdConfig from './components/config/index.vue' // 右侧配置区

const asideRightWidth = toRef(props, 'asideRightWidth')
const rightAsideWidth = computed(() => {
  return (asideRightWidth.value + '').includes('px') ? asideRightWidth.value : asideRightWidth.value + 'px'
})
// =================右侧配置区================= END

</script>

<style lang="scss">
@import "./styles/index.scss";
</style>