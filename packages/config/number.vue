<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="最小值">
      <el-input-number v-model="data.minRows"
                       controls-position="right"
                       placeholder="最小值"></el-input-number>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="data.maxRows"
                       controls-position="right"
                       placeholder="最大值"></el-input-number>
    </el-form-item>
    <el-form-item label="步长">
      <el-input-number v-model="data.step"
                       controls-position="right"
                       placeholder="步长"></el-input-number>
    </el-form-item>
    <el-form-item label="数值精度">
      <el-input-number v-model="data.precision"
                       controls-position="right"
                       placeholder="数值精度"
                       :min="0"
                       :max="10"></el-input-number>
    </el-form-item>
    <el-form-item label="开启控制器"
                  label-width="100px">
      <el-switch v-model="data.controls"></el-switch>
    </el-form-item>
    <el-form-item label="控制器位置"
                  label-width="100px"
                  v-if="data.controls">
      <el-radio v-model="data.controlsPosition"
                label="">默认
      </el-radio>
      <el-radio v-model="data.controlsPosition"
                label="right">右
      </el-radio>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-number",
  props: ['data'],
}
</script>
