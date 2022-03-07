<template>
  <div>
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
        fullScreen: true,
        minimap: {
          enabled: false,
        },
      },
    }
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
  }
}
</script>