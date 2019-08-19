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
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                placeholder="占位内容"></el-input>
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
    <el-form-item label="前缀">
      <el-input v-model="data.prepend"
                placeholder="前缀"></el-input>
    </el-form-item>
    <el-form-item label="后缀">
      <el-input v-model="data.append"
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
    <el-form-item label="是否只读">
      <el-switch v-model="data.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <el-form-item label="校验"><br>
      是否必填：
      <el-switch v-model="data.required"></el-switch>
      <el-input v-model.lazy="data.pattern"
                placeholder="正则表达式"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-input",
  props: ['data'],
  data () {
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
    generateRule () {
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
