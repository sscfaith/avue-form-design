<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                clearable
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="前缀">
      <el-input v-model="data.prepend"
                clearable
                placeholder="前缀"></el-input>
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="data.append"
                clearable
                placeholder="后缀"></el-input>
    </el-form-item>
    <el-form-item label="最大长度">
      <el-input-number v-model="data.maxlength"
                       controls-position="right"
                       placeholder="最大长度"></el-input-number>
    </el-form-item>
    <el-form-item label="显示计数"
                  v-if="data.type != 'password'">
      <el-switch v-model="data.showWordLimit"></el-switch>
    </el-form-item>
    <el-form-item label="显示密码"
                  v-if="data.type == 'password'">
      <el-switch v-model="data.showPassword"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="data.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.required"></el-switch>
      <el-input v-if="data.required"
                v-model.lazy="data.pattern"
                placeholder="正则表达式"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-input",
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
    },
    'data.pattern': function (val) {
      if (val) this.validator.pattern = { pattern: new RegExp(val), message: `${this.data.label}格式不匹配` }
      else this.validator.pattern = null

      // delete this.data.pattern
      this.generateRule()
    }
  }
}
</script>
