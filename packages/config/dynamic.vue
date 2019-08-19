<template>
  <div>
    <el-form-item label="类型">
      <el-select v-model="data.type"
                 placeholder="请选择类型">
        <el-option-group v-for="group in fields"
                         :key="group.title"
                         :label="group.title">
          <el-option v-for="item in group.list"
                     :key="item.type"
                     :label="item.label"
                     :value="item.type">
          </el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item label="属性值">
      <el-input v-model="data.prop"
                placeholder="属性值"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="data.label"
                placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="表单栅格">
      <el-input-number v-model="data.span"
                       controls-position="right"
                       placeholder="表单栅格"
                       :min="6"
                       :max="24"></el-input-number>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-dynamic",
  props: ['data']
}
</script>
