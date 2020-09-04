<template>
  <div>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="距左边边距">
      <el-input v-model="data.labelWidth"
                placeholder="距左边边距"></el-input>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker v-model="data.styles.color"
                       size="mini"></el-color-picker>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="data.styles.fontSize"
                placeholder="字体大小"></el-input>
    </el-form-item>
    <el-form-item label="粗体">
      <el-select v-model="data.styles.fontWeight"
                 placeholder="粗体">
        <el-option v-for="item in options"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-title",
  props: ['data'],
  data() {
    return {
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'blod', 'bloder', 'inherit', 'initial', 'lighter', 'normal', 'revert', 'unset']
    }
  }
}
</script>
