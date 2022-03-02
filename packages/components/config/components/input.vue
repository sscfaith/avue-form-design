<template>
  <el-form-item label="占位内容">
    <el-input v-model="data.placeholder" clearable placeholder="占位内容"></el-input>
  </el-form-item>
  <el-form-item label="前缀">
    <el-input v-model="data.prepend" clearable placeholder="前缀"></el-input>
  </el-form-item>
  <el-form-item label="后缀">
    <el-input v-model="data.append" clearable placeholder="后缀"></el-input>
  </el-form-item>
  <el-form-item label="最大长度">
    <el-input-number v-model="data.maxlength" :min="1" controls-position="right" placeholder="最大长度"></el-input-number>
  </el-form-item>
  <el-form-item label="显示计数" v-if="data.type != 'password'">
    <el-switch v-model="data.showWordLimit"></el-switch>
  </el-form-item>
  <el-form-item label="显示密码" v-if="data.type == 'password'">
    <el-switch v-model="data.showPassword"></el-switch>
  </el-form-item>
</template>

<script>
export default {
  name: 'config-input',
  props: ['data']
}
</script>