<template>
  <div>
    <el-form-item label="上传地址"
                  v-if="!data.oss">
      <el-input v-model="data.action"
                clearable
                placeholder="上传地址"></el-input>
    </el-form-item>
    <el-form-item label="接受文件类型"
                  label-width="110px"
                  v-if="!data.oss">
      <el-input v-model="data.accept"
                clearable
                placeholder="接受文件类型，如：image/png,image/jpg"></el-input>
    </el-form-item>
    <el-form-item label="OSS">
      <template slot="label">
        <el-link :underline="false"
                 href="https://avuejs.com/form/form-upload.html#%E9%98%BF%E9%87%8C%E4%BA%91oss%E4%B8%8A%E4%BC%A0"
                 target="_blank">OSS <i class="el-icon-question"></i></el-link>
      </template>
      <el-select v-model="data.oss"
                 placeholder="oss不写则为普通上传"
                 clearable
                 style="width: 100%">
        <el-option label="阿里"
                   value="ali"></el-option>
        <el-option label="七牛"
                   value="qiniu"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="avueVersion('2.9.0')">
      <el-form-item label="是否拖拽上传"
                    label-width="110px">
        <el-switch v-model="data.drag"></el-switch>
      </el-form-item>
      <el-form-item label="文件列表类型"
                    label-width="110px"
                    v-if="!data.drag">
        <el-select v-model="data.listType"
                   placeholder="文件列表类型"
                   clearable>
          <el-option label="附件"
                     value="text"></el-option>
          <el-option label="照片墙"
                     value="picture-card"></el-option>
          <el-option label="头像"
                     value="picture-img"></el-option>
          <el-option label="缩略图"
                     value="picture"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item label="拖拽上传"
                    label-width="110px">
        <el-switch v-model="data.dragFile"></el-switch>
      </el-form-item>
      <el-form-item label="文件列表类型"
                    label-width="110px"
                    v-if="!data.dragFile">
        <el-select v-model="data.listType"
                   placeholder="文件列表类型"
                   clearable>
          <el-option label="附件"
                     value="text"></el-option>
          <el-option label="照片墙"
                     value="picture-card"></el-option>
          <el-option label="头像"
                     value="picture-img"></el-option>
          <el-option label="缩略图"
                     value="picture"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拖拽排序"
                    label-width="110px">
        <el-switch v-model="data.drag"></el-switch>
      </el-form-item>
    </template>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">参数设置：</label>
      <div class="el-form-item__content">
        请求头
        <avue-dynamic v-model="data.headersConfig"
                      :children="option"></avue-dynamic>
        请求体
        <avue-dynamic v-model="data.dataConfig"
                      :children="option"></avue-dynamic>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">
        <el-link :underline="false"
                 href="https://avuejs.com/form/form-upload.html"
                 target="_blank">上传参数设置 <i class="el-icon-question"></i></el-link>
      </label>
      <div class="el-form-item__content">
        上传成功返回结构体的图片地址
        <el-input v-model="data.propsHttp.url"
                  size="small"
                  placeholder="上传成功返回结构体的图片地址"></el-input>
        上传成功返回结构体的图片的姓名
        <el-input v-model="data.propsHttp.name"
                  size="small"
                  placeholder="上传成功返回结构体的图片的姓名"></el-input>
        返回结构体的层次
        <el-input v-model="data.propsHttp.res"
                  size="small"
                  placeholder="返回结构体的层次"></el-input>
        文件名称
        <el-input v-model="data.propsHttp.fileName"
                  size="small"
                  placeholder="文件名称，默认file"></el-input>
      </div>
    </div>
    <el-form-item label="是否显示已上传文件列表"
                  label-width="180px">
      <el-switch v-model="data.showFileList"></el-switch>
    </el-form-item>
    <el-form-item label="文件大小">
      <el-input-number v-model="data.fileSize"
                       controls-position="right"
                       placeholder="文件大小限制（字节）"
                       :min="0"
                       style="width: 100%;"></el-input-number>
    </el-form-item>
    <el-form-item label="上传限制提示"
                  label-width="110px">
      <el-input v-model="data.tip"
                clearable
                placeholder="上传限制提示"></el-input>
    </el-form-item>
    <el-form-item label="上传中提示"
                  label-width="110px">
      <el-input v-model="data.loadText"
                clearable
                placeholder="上传中提示"></el-input>
    </el-form-item>
    <el-form-item label="是否多文件上传"
                  label-width="130px">
      <el-switch v-model="data.multiple"></el-switch>
    </el-form-item>
    <el-form-item v-if="data.multiple"
                  label="多文件数量限制"
                  label-width="130px">
      <el-input-number v-model="data.limit"
                       controls-position="right"
                       placeholder="多文件上传数量限制"
                       :min="1"
                       style="width: 100%;"></el-input-number>
    </el-form-item>
    <el-form-item label="水印配置，开启后只能上传图片"
                  label-width="230px">
      <el-switch v-model="data.showCanvas"></el-switch>
    </el-form-item>
    <div class="el-form-item el-form-item--small el-form--label-top"
         v-if="data.canvasOption">
      <label class="el-form-item__label"
             style="padding: 0;">水印设置：</label>
      <div class="el-form-item__content">
        水印文字
        <el-input v-model="data.canvasOption.text"
                  size="small"
                  clearable
                  placeholder="水印文字"></el-input>
        字体类型
        <el-input v-model="data.canvasOption.fontFamily"
                  size="small"
                  clearable
                  placeholder="字体类型"></el-input>
        字体颜色
        <avue-input-color v-model="data.canvasOption.color"
                          size="small"
                          placeholder="字体颜色"></avue-input-color>
        字体大小
        <el-input-number v-model="data.canvasOption.fontSize"
                         size="small"
                         controls-position="right"
                         placeholder="字体大小"></el-input-number>
        文字的透明度
        <el-input-number v-model="data.canvasOption.opacity"
                         size="small"
                         controls-position="right"
                         placeholder="文字的透明度"
                         :step="10"
                         :min="10"
                         :max="100"></el-input-number>
        文字距离图片底部的距离<br>
        <el-input-number v-model="data.canvasOption.bottom"
                         controls-position="right"
                         placeholder="文字距离图片底部的距离"
                         size="small"></el-input-number>
        文字距离图片右边的距离<br>
        <el-input-number v-model="data.canvasOption.right"
                         controls-position="right"
                         placeholder="文字距离图片右边的距离"
                         size="small"></el-input-number>
        压缩图片比率<br>
        <el-input-number v-model="data.canvasOption.ratio"
                         controls-position="right"
                         placeholder="压缩图片比率"
                         :step="0.1"
                         :min="0"
                         :max="1"
                         size="small"></el-input-number>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "config-upload",
  props: ['data'],
  data() {
    return {
      option: {
        column: [{
          type: 'input',
          prop: 'key',
          label: 'key'
        }, {
          type: 'input',
          prop: 'value',
          label: 'value'
        }]
      },
    }
  },
  watch: {
    'data.prop': {
      handler() {
        if (!this.avueVersion('2.9.0') && this.data.drag != undefined) {
          this.$set(this.data, 'dragFile', this.data.drag)
          this.$delete(this.data, 'drag')
        }
      },
      immediate: true
    },
    'data.drag': function (val) {
      if (!this.avueVersion('2.9.0')) return
      if (val) this.$delete(this.data, 'listType')
    },
    'data.dragFile': function (val) {
      if (val) this.$delete(this.data, 'listType')
    },
    'data.showCanvas'(val) {
      if (val) {
        this.$set(this.data, 'canvasOption', {})
        this.$set(this.data, 'accept', 'image/*')
      } else {
        this.$delete(this.data, 'canvasOption')
      }
    }
  }
}
</script>
