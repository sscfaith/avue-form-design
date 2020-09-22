<template>
  <div>
    <el-form-item label="标题宽度"
                  v-if="data.label">
      <el-input v-model="data.labelWidth"
                placeholder="标题宽度"></el-input>
    </el-form-item>
    自定义属性
    <monaco-editor v-model="params"
                   height="300"
                   :options="options"></monaco-editor>
    自定义事件
    <monaco-editor v-model="event"
                   height="300"
                   :options="options"></monaco-editor>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
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
    }
  },
  methods: {
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
    }
  }
}
</script>