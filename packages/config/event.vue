<template>
  <div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">change：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="change"
                       height="300"
                       :keyIndex="`event-change-${data.prop}`"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">click：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="click"
                       height="200"
                       :keyIndex="`event-click-${data.prop}`"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">focus：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="focus"
                       height="200"
                       :keyIndex="`event-focus-${data.prop}`"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">blur：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="blur"
                       height="200"
                       :keyIndex="`event-blur-${data.prop}`"
                       :options="options"></monaco-editor>
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from '@utils/monaco-editor'

export default {
  name: "config-event",
  components: { MonacoEditor },
  props: ['data'],
  watch: {
    'data.prop': {
      handler() {
        const { change, click, focus, blur } = this.data
        this.$set(this, 'change', change ? change + '' : '({value}) => {\r\n\r\n}')
        this.$set(this, 'click', click ? click + '' : '({value}) => {\r\n\r\n}')
        this.$set(this, 'focus', focus ? focus + '' : '({value}) => {\r\n\r\n}')
        this.$set(this, 'blur', blur ? blur + '' : '({value}) => {\r\n\r\n}')
      },
      immediate: true
    }
  },
  data() {
    return {
      change: '',
      click: '',
      focus: '',
      blur: '',
      options: {
        fullScreen: true,
        minimap: {
          enabled: false,
        },
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      const event = ['change', 'click', 'focus', 'blur']
      event.forEach(e => {
        this.$watch(`${e}`, (val) => {
          try {
            this.$set(this.data, e, eval(val))
          } catch (err) {
            // console.error(e)
          }
        })
      })
    })
  }
}
</script>
