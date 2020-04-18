<template>
  <div>
    <el-form-item label="图片上传地址">
      <el-input v-model="data.options.action"
                placeholder="图片上传地址"></el-input>
    </el-form-item>
    <el-form-item label="配置参数">
      <a href="https://avuejs.com/doc/plugins/ueditor-plugins"
         target="_blank"
         style="color: #409EFF;">详细文档</a><br>
      返回的数据结构层次
      <el-input v-model="data.options.props.res"
                placeholder="返回的数据结构层次"></el-input>
      返回结构体图片地址字段
      <el-input v-model="data.options.props.url"
                placeholder="返回结构体图片地址字段"></el-input>
    </el-form-item>
    <el-form-item label="oss">
      <el-select v-model="data.options.oss"
                 placeholder="oss不写则为普通上传"
                 clearable>
        <el-option label="阿里"
                   value="ali"></el-option>
        <el-option label="七牛"
                   value="qiniu"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="data.options.oss == 'qiniu'">
      <el-form-item label="七牛oss配置"><br>
        AK
        <el-input v-model="data.options.qiniu.AK"
                  placeholder="七牛云的密钥(AK)"></el-input>
        SK
        <el-input v-model="data.options.qiniu.SK"
                  placeholder="七牛云的密钥(SK)"></el-input>
        scope
        <el-input v-model="data.options.qiniu.scope"
                  placeholder="七牛云存储的空间名"></el-input>
        url
        <el-input v-model="data.options.qiniu.url"
                  placeholder="空间的自定义域名"></el-input>
        deadline
        <el-input v-model="data.options.qiniu.deadline"
                  placeholder="token的过期时间"></el-input>
      </el-form-item>
    </template>
    <template v-if="data.options.oss == 'ali'">
      <el-form-item label="阿里oss配置"><br>
        region
        <el-input v-model="data.options.ali.region"
                  placeholder="region"></el-input>
        endpoint
        <el-input v-model="data.options.ali.endpoint"
                  placeholder="endpoint"></el-input>
        accessKeyId
        <el-input v-model="data.options.ali.accessKeyId"
                  placeholder="accessKeyId"></el-input>
        accessKeySecret
        <el-input v-model="data.options.ali.accessKeySecret"
                  placeholder="accessKeySecret"></el-input>
        bucket
        <el-input v-model="data.options.ali.bucket"
                  placeholder="bucket	"></el-input>
      </el-form-item>
    </template>
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
  name: "config-ueditor",
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
    'data.options.oss': function (val) {
      if (val == 'ali') this.data.options.qiniu = {}
      else if (val == 'qiniu') this.data.options.ali = {}
    }
  }
}
</script>
