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
    <el-form-item label="默认值">
      <el-input v-model="data.valueDefault"
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="表单栅格">
      <el-input-number v-model="data.span"
                       controls-position="right"
                       placeholder="表单栅格"
                       :min="6"
                       :max="24"></el-input-number>
    </el-form-item>
    <el-form-item label="自定义">
      <el-button type="text"
                 @click="handleDicClear"
                 class="danger">清空</el-button>
      <div class="dic"
           v-for="(item, index) in data.dicData"
           :key="index">
        <el-input size="mini"
                  v-model="item.label"
                  placeholder="自定义文字"
                  style="margin-right: 5px"></el-input>
        <el-input size="mini"
                  v-model="item.value"
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
    handleDicClear () {
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
