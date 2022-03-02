<template>
  <el-drawer
    v-model="visible"
    title="生成JSON"
    size="50%"
    custom-class="afd-drawer"
    append-to-body
    destroy-on-close
  >
    <monaco-editor v-model="json" keyIndex="generate"></monaco-editor>
    <span class="afd-drawer__footer">
      <el-button @click="hide()"  type="primary">确定</el-button>
      <el-popover placement="top" trigger="hover" :width="400">
        <template #reference>
          <el-button  type="primary" @click="handleCopy">复制</el-button>
        </template>
        <el-form
          v-model="copyOption"
          style="padding: 0 20px"
          label-suffix="："
          label-width="180px"
          label-position="left"
        >
          <el-form-item label="类型">
            <el-popover
              placement="top-start"
              trigger="hover"
              content="复制json对象"
              style="margin-right: 15px;"
            >
              <template #reference>
                <el-radio v-model="copyOption.generateType" label="json">json</el-radio>
              </template>
            </el-popover>
            <el-popover
              placement="top-start"
              trigger="hover"
              content="复制string字符串，可直接用于后端保存无需再次处理。"
            >
              <template #reference>
                <el-radio v-model="copyOption.generateType" label="string">string</el-radio>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="缩进长度-空格数量">
            <el-slider
              v-model="copyOption.space"
              show-stops
              :marks="{ 1: '1', 2: '2', 3: '3', 4: '4' }"
              :min="1"
              :max="4"
              :step="1"
            ></el-slider>
          </el-form-item>
          <el-form-item label="引号类型">
            <el-switch
              v-model="copyOption.quoteType"
              active-value="single"
              inactive-value="double"
              active-text="单引号"
              inactive-text="双引号"
            ></el-switch>
          </el-form-item>
          <el-form-item label="移除key的引号">
            <el-switch v-model="copyOption.dropQuotesOnKeys"></el-switch>
          </el-form-item>
          <el-form-item label="移除数字字符串的引号">
            <el-switch v-model="copyOption.dropQuotesOnNumbers"></el-switch>
          </el-form-item>
        </el-form>
      </el-popover>
    </span>
  </el-drawer>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from "vue"
import MonacoEditor from '../../../utils/monaco-editor'
import beautifier from '../../../utils/json-beautifier'

defineEmits(['submit'])

let json = ref('')

let visible = ref(false)

const show = (data) => {
  json.value = data
  visible.value = true
}
const hide = () => {
  visible.value = false
}
defineExpose({ show })

let copyOption = reactive({
  generateType: 'json',
  space: 2,
  quoteType: 'single',
  dropQuotesOnKeys: true
})
const { proxy } = getCurrentInstance()
const handleCopy = () => {
  proxy.$Clipboard({
    text: beautifier(json.value, {
      minify: true,
      ...copyOption
    })
  }).then(() => {
    proxy.$message.success('复制成功')
  }).catch(() => {
    proxy.$message.error('复制失败')
  })
}

</script>