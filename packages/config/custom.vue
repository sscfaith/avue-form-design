<template>
  <div>
    <el-form-item label="标题宽度">
      <el-input v-model="data.labelWidth"
                clearable
                placeholder="标题宽度"></el-input>
    </el-form-item>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">自定义属性：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="params"
                       height="300"
                       :keyIndex="data.prop"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">自定义事件：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="event"
                       height="300"
                       :keyIndex="data.prop"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <el-form-item label="是否只读">
      <el-switch v-model="data.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
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
import MonacoEditor from '@utils/monaco-editor'

export default {
  name: 'config-custom',
  components: { MonacoEditor },
  props: ['data'],
  data() {
    return {
      params: this.data.params || {},
      event: this.data.event || {},
      options: {
        minimap: {
          enabled: false,
        },
      },
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
    'data.params'(val) {
      this.params = val || {}
    },
    'data.event'(val) {
      this.event = val || {}
    },
    params(val) {
      try {
        this.data.params = eval("(" + val + ")")
      } catch (e) {
        // console.error(e)
      }
    },
    event(val) {
      try {
        this.data.event = eval("(" + val + ")")
      } catch (e) {
        // console.error(e)
      }
    },
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