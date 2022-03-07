<template>
  <div>
    <el-form-item label="默认值">
      <a href="https://avuejs.com/form/form-input-map.html"
         target="_blank"
         style="color: #409EFF;">详细文档</a><br>
      <el-input v-model="data.value"
                placeholder="默认值"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-map",
  props: ['data'],
}
</script>
