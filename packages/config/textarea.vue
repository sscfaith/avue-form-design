<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                type="textarea"
                autosize
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="最大长度">
      <el-input-number v-model="data.maxlength"
                       controls-position="right"
                       placeholder="最大长度"></el-input-number>
    </el-form-item>
    <el-form-item label="显示计数">
      <el-switch v-model="data.showWordLimit"></el-switch>
    </el-form-item>
    <el-form-item label="最小行">
      <el-input-number v-model="data.minRows"
                       controls-position="right"
                       placeholder="最小行"
                       :min="1"></el-input-number>
    </el-form-item>
    <el-form-item label="最大行">
      <el-input-number v-model="data.maxRows"
                       controls-position="right"
                       placeholder="最大行"
                       :min="2"></el-input-number>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-textarea",
  props: ['data'],
}
</script>
