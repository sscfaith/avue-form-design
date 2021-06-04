<template>
  <div id="app">
    <avue-form-design style="height: 100vh;"
                      :options="options"
                      @submit="handleSubmit"
                      :custom-fields="customFields"
                      :default-values="defaultValues"></avue-form-design>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      customFields: [{
        title: '部门',
        list: [
          {
            title: '分割线',
            component: 'el-divider',//ele分割线
            span: 24,
            icon: 'el-icon-eleme',
            tips: '看我：自定义属性怎么用？',
            labelWidth: '0px',
            params: {
              html: '<h3 style="color:red">分割线标题</h3>',
              contentPosition: "left",
            }
          },
          {
            title: '警告',
            component: 'el-alert',
            labelWidth: '0px',
            span: 24,
            icon: 'el-icon-warning',
            tips: '看我：自定义事件怎么用？',
            params: {
              title: '警告警告警告警告',
              type: 'success'
            },
            event: {
              close: () => {
                console.log('alert关闭事件')
              }
            }
          },
        ]
      }],
      options: { column: [] },
      defaultValues: {
        input: [{
          label: '当前操作人部门',
          value: '${this.$store.getters.userInfo.dept_name}'
        }],
      }
    }
  },
  methods: {
    handleSubmit(val) {
      this.$message.success("查看控制台")
      console.log(val);
    },
  }
}
</script>
