<template>
  <div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">change：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="change"
                       height="200"
                       keyIndex="event-change"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">click：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="click"
                       height="200"
                       keyIndex="event-click"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">focus：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="focus"
                       height="200"
                       keyIndex="event-focus"
                       :options="options"></monaco-editor>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">blur：</label>
      <div class="el-form-item__content">
        <monaco-editor v-model="blur"
                       height="200"
                       keyIndex="event-blur"
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
  data() {
    return {
      change: this.data.change ? this.data.change + '' : '({value}) => {\r\n\r\n}',
      click: this.data.click ? this.data.click + '' : '({value}) => {\r\n\r\n}',
      focus: this.data.focus ? this.data.focus + '' : '({value}) => {\r\n\r\n}',
      blur: this.data.blur ? this.data.blur + '' : '({value}) => {\r\n\r\n}',
      options: {
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
