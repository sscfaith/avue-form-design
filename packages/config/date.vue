<template>
  <div>
    <template v-if="data.type.indexOf('range') != -1">
      <el-form-item label="开始占位内容"
                    label-width="110px">
        <el-input v-model="data.startPlaceholder"
                  clearable
                  placeholder="开始占位内容"></el-input>
      </el-form-item>
      <el-form-item label="结束占位内容"
                    label-width="110px">
        <el-input v-model="data.endPlaceholder"
                  clearable
                  placeholder="结束占位内容"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="占位内容"
                  v-else>
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                clearable
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="显示格式化"
                  label-width="100px">
      <el-input v-model="data.format"
                clearable
                placeholder="显示格式化"></el-input>
    </el-form-item>
    <el-form-item label="值格式化">
      <el-input v-model="data.valueFormat"
                clearable
                placeholder="值格式化"></el-input>
    </el-form-item>
    <el-form-item label="取消范围联动"
                  label-width="110px"
                  v-if="['timerange', 'daterange', 'datetimerange'].includes(data.type)">
      <el-switch v-model="data.unlinkPanels"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.required"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-date",
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      }
    }
  },
  methods: {
    generateRule() {
      const rules = [];
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) rules.push(this.validator[key])
      })
      this.data.rules = rules
    },
  },
  watch: {
    'data.required': function (val) {
      if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else this.validator.required = null

      this.generateRule()
    }
  }
}
</script>
