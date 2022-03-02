<template>
  <el-drawer
    v-model="visible"
    title="导入JSON"
    size="50%"
    custom-class="afd-drawer"
    append-to-body
    destroy-on-close
  >
    <monaco-editor v-model="json" keyIndex="import"></monaco-editor>
    <span class="afd-drawer__footer">
      <el-button @click="$emit('submit', json, hide)"  type="primary">确定</el-button>
      <el-button @click="hide" >取消</el-button>
    </span>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue"
import MonacoEditor from '../../../utils/monaco-editor'

defineEmits(['submit'])

let json = ref('')

let visible = ref(false)
const show = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
}
defineExpose({ show })

</script>