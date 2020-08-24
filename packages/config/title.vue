<template>
  <div>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker v-model="data.styles.color"
                       size="mini"></el-color-picker>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="data.styles.fontSize"
                placeholder="字体大小"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-title",
  props: ['data'],
}
</script>
