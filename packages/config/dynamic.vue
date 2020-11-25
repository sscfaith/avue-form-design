<template>
  <div>
    <el-form-item label="对齐方式">
      <el-select v-model="data.children.align"
                 placeholder="对齐方式"
                 clearable>
        <el-option label="居左"
                   value="left"></el-option>
        <el-option label="居中"
                   value="center"></el-option>
        <el-option label="居右"
                   value="right"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="头部对齐方式"
                  label-width="110px">
      <el-select v-model="data.children.headerAlign"
                 placeholder="对齐方式"
                 clearable>
        <el-option label="居左"
                   value="left"></el-option>
        <el-option label="居中"
                   value="center"></el-option>
        <el-option label="居右"
                   value="right"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="表单格式">
      <el-select v-model="data.children.type"
                 placeholder="表单格式"
                 clearable>
        <el-option label="表格"
                   value=""></el-option>
        <el-option label="表单"
                   value="form"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="序号"
                  v-if="data.children.type == 'form'">
      <el-switch v-model="data.children.index"></el-switch>
    </el-form-item>
    <el-form-item label="添加按钮">
      <el-switch v-model="data.children.addBtn"></el-switch>
    </el-form-item>
    <el-form-item label="删除按钮">
      <el-switch v-model="data.children.delBtn"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="data.readonly"></el-switch>
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
