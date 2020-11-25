<template>
  <div>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                clearable
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="自定义">
      <el-button type="text"
                 @click="handleDicClear"
                 class="danger">清空
      </el-button>
      <div class="dic"
           v-for="(item, index) in data.dicData"
           :key="index">
        <el-input size="mini"
                  v-model="item.label"
                  placeholder="自定义文字"
                  clearable
                  style="margin-right: 5px"></el-input>
        <el-input size="mini"
                  v-model="item.value"
                  clearable
                  placeholder="自定义值"></el-input>
      </div>
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
  name: "config-switch",
  props: ['data'],
  methods: {
    handleDicClear() {
      this.data.dicData = [{ label: '', value: '0' }, { label: '', value: '1' }]
    }
  },
}
</script>
<style lang="scss" scoped>
.dic {
  display: flex;
  margin-bottom: 5px;
}
</style>
