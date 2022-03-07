<template>
  <div>
    <el-form-item label="图片上传地址"
                  label-width="110px">
      <el-input v-model="data.options.action"
                clearable
                placeholder="图片上传地址"></el-input>
    </el-form-item>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">
        <el-link :underline="false"
                 href="https://avuejs.com/plugins/ueditor-plugins.html"
                 target="_blank">参数设置 <i class="el-icon-question"></i></el-link>
      </label>
      <div class="el-form-item__content">
        返回的数据结构层次
        <el-input v-model="data.options.props.res"
                  size="small"
                  placeholder="返回的数据结构层次"></el-input>
        返回结构体图片地址字段
        <el-input v-model="data.options.props.url"
                  size="small"
                  placeholder="返回结构体图片地址字段"></el-input>
      </div>
    </div>
    <el-form-item label="OSS">
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
      <div class="el-form-item el-form-item--small el-form--label-top">
        <label class="el-form-item__label"
               style="padding: 0;">七牛oss配置：</label>
        <div class="el-form-item__content">
          AK：
          <el-input v-model="data.options.qiniu.AK"
                    size="small"
                    clearable
                    placeholder="七牛云的密钥(AK)"></el-input>
          SK：
          <el-input v-model="data.options.qiniu.SK"
                    size="small"
                    clearable
                    placeholder="七牛云的密钥(SK)"></el-input>
          scope：
          <el-input v-model="data.options.qiniu.scope"
                    size="small"
                    clearable
                    placeholder="七牛云存储的空间名"></el-input>
          url：
          <el-input v-model="data.options.qiniu.url"
                    size="small"
                    clearable
                    placeholder="空间的自定义域名"></el-input>
          deadline：
          <el-input v-model="data.options.qiniu.deadline"
                    size="small"
                    clearable
                    placeholder="token的过期时间"></el-input>
        </div>
      </div>
    </template>
    <template v-if="data.options.oss == 'ali'">
      <div class="el-form-item el-form-item--small el-form--label-top">
        <label class="el-form-item__label"
               style="padding: 0;">七牛oss配置：</label>
        <div class="el-form-item__content">
          region：
          <el-input v-model="data.options.ali.region"
                    size="small"
                    clearable
                    placeholder="region"></el-input>
          endpoint：
          <el-input v-model="data.options.ali.endpoint"
                    size="small"
                    clearable
                    placeholder="endpoint"></el-input>
          accessKeyId：
          <el-input v-model="data.options.ali.accessKeyId"
                    size="small"
                    clearable
                    placeholder="accessKeyId"></el-input>
          accessKeySecret：
          <el-input v-model="data.options.ali.accessKeySecret"
                    size="small"
                    clearable
                    placeholder="accessKeySecret"></el-input>
          bucket：
          <el-input v-model="data.options.ali.bucket"
                    size="small"
                    clearable
                    placeholder="bucket	"></el-input>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "config-ueditor",
  props: ['data'],
  watch: {
    'data.options.oss': function (val) {
      debugger
      if (val == 'ali') this.data.options.qiniu = {}
      else if (val == 'qiniu') this.data.options.ali = {}
    }
  }
}
</script>
