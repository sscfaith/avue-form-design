<template>
  <div>
    <el-form-item label="图片上传地址"
                  label-width="110px">
      <el-input v-model="data.action"
                clearable
                placeholder="图片上传地址"></el-input>
    </el-form-item>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">
        <el-link :underline="false"
                 href="https://avuejs.com/doc/plugins/ueditor-plugins"
                 target="_blank">参数设置 <i class="el-icon-question"></i></el-link>
      </label>
      <div class="el-form-item__content">
        返回的数据结构层次
        <el-input v-model="data.props.res"
                  size="small"
                  placeholder="返回的数据结构层次"></el-input>
        返回结构体图片地址字段
        <el-input v-model="data.props.url"
                  size="small"
                  placeholder="返回结构体图片地址字段"></el-input>
      </div>
    </div>
    <el-form-item label="OSS">
      <el-select v-model="data.oss"
                 placeholder="oss不写则为普通上传"
                 clearable>
        <el-option label="阿里"
                   value="ali"></el-option>
        <el-option label="七牛"
                   value="qiniu"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="data.oss == 'qiniu'">
      <div class="el-form-item el-form-item--small el-form--label-top">
        <label class="el-form-item__label"
               style="padding: 0;">七牛oss配置：</label>
        <div class="el-form-item__content">
          AK：
          <el-input v-model="data.qiniu.AK"
                    size="small"
                    clearable
                    placeholder="七牛云的密钥(AK)"></el-input>
          SK：
          <el-input v-model="data.qiniu.SK"
                    size="small"
                    clearable
                    placeholder="七牛云的密钥(SK)"></el-input>
          scope：
          <el-input v-model="data.qiniu.scope"
                    size="small"
                    clearable
                    placeholder="七牛云存储的空间名"></el-input>
          url：
          <el-input v-model="data.qiniu.url"
                    size="small"
                    clearable
                    placeholder="空间的自定义域名"></el-input>
          deadline：
          <el-input v-model="data.qiniu.deadline"
                    size="small"
                    clearable
                    placeholder="token的过期时间"></el-input>
        </div>
      </div>
    </template>
    <template v-if="data.oss == 'ali'">
      <div class="el-form-item el-form-item--small el-form--label-top">
        <label class="el-form-item__label"
               style="padding: 0;">七牛oss配置：</label>
        <div class="el-form-item__content">
          region：
          <el-input v-model="data.ali.region"
                    size="small"
                    clearable
                    placeholder="region"></el-input>
          endpoint：
          <el-input v-model="data.ali.endpoint"
                    size="small"
                    clearable
                    placeholder="endpoint"></el-input>
          accessKeyId：
          <el-input v-model="data.ali.accessKeyId"
                    size="small"
                    clearable
                    placeholder="accessKeyId"></el-input>
          accessKeySecret：
          <el-input v-model="data.ali.accessKeySecret"
                    size="small"
                    clearable
                    placeholder="accessKeySecret"></el-input>
          bucket：
          <el-input v-model="data.ali.bucket"
                    size="small"
                    clearable
                    placeholder="bucket	"></el-input>
        </div>
      </div>
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
    'data.required': function (val) {
      if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else this.validator.required = null
      this.generateRule()
    },
    'data.oss': function (val) {
      if (val == 'ali') this.data.qiniu = {}
      else if (val == 'qiniu') this.data.ali = {}
    }
  }
}
</script>
