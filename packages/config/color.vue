<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-color",
  props: ['data'],
}
</script>
