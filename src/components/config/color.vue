<template>
  <div>
    <el-form-item label="属性值">
      <el-input v-model="data.prop" placeholder="属性值"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="data.label" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder" placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="表单栅格">
      <el-input-number v-model="data.span" controls-position="right" placeholder="表单栅格" :min="6"
                       :max="24"></el-input-number>
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
    name: "config-color",
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
      'data.required': function(val) {
        if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
        else this.validator.required = null

        this.generateRule()
      }
    }
  }
</script>
