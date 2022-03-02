<template>
  <el-form-item label="开启折叠">
    <el-switch v-model="data.arrow"></el-switch>
  </el-form-item>
  <el-form-item label="默认展开" v-if="data.arrow">
    <el-switch v-model="data.collapse"></el-switch>
  </el-form-item>
</template>
<script>

export default {
  name: "config-group",
  props: ['data'],
}
</script>
<style lang="scss" scoped>
</style>
