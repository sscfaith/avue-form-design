<template>
  <div>
    <el-form-item label="属性值">
      <el-input v-model="data.prop" placeholder="属性值"></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="data.label" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="表单栅格">
      <el-input-number v-model="data.span" controls-position="right" placeholder="表单栅格" :min="6"
                       :max="24"></el-input-number>
    </el-form-item>
    <el-form-item label="图片上传地址">
      <el-input v-model="data.action" placeholder="图片上传地址"></el-input>
    </el-form-item>
    <el-form-item label="配置参数"><br>
      返回的数据结构层次
      <el-input v-model="data.props.res" placeholder="返回的数据结构层次"></el-input>
      返回结构体图片地址字段
      <el-input v-model="data.props.url" placeholder="返回结构体图片地址字段"></el-input>
    </el-form-item>
    <el-form-item label="oss">
      <el-select v-model="data.oss" placeholder="oss不写则为普通上传" clearable>
        <el-option label="阿里" value="ali"></el-option>
        <el-option label="七牛" value="qiniu"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="data.oss == 'qiniu'">
      <el-form-item label="七牛oss配置"><br>
        AK
        <el-input v-model="data.qiniu.AK" placeholder="七牛云的密钥(AK)"></el-input>
        SK
        <el-input v-model="data.qiniu.SK" placeholder="七牛云的密钥(SK)"></el-input>
        scope
        <el-input v-model="data.qiniu.scope" placeholder="七牛云存储的空间名"></el-input>
        url
        <el-input v-model="data.qiniu.url" placeholder="空间的自定义域名"></el-input>
        deadline
        <el-input v-model="data.qiniu.deadline" placeholder="token的过期时间"></el-input>
      </el-form-item>
    </template>
    <template v-if="data.oss == 'ali'">
      <el-form-item label="阿里oss配置"><br>
        region
        <el-input v-model="data.ali.region" placeholder="region"></el-input>
        endpoint
        <el-input v-model="data.ali.endpoint" placeholder="endpoint"></el-input>
        accessKeyId
        <el-input v-model="data.ali.accessKeyId" placeholder="accessKeyId"></el-input>
        accessKeySecret
        <el-input v-model="data.ali.accessKeySecret" placeholder="accessKeySecret"></el-input>
        bucket
        <el-input v-model="data.ali.bucket" placeholder="bucket	"></el-input>
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
      },
      'data.oss': function(val) {
        if (val == 'ali') this.data.qiniu = {}
        else if (val == 'qiniu') this.data.ali = {}
      }
    }
  }
</script>
