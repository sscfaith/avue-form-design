<template>
  <div id="app">
    <avue-form-design style="height: 100vh;"
                      :options="options"
                      @submit="handleSubmit"
                      storage
                      show-avue-doc
                      :custom-fields="customFields"></avue-form-design>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      customFields: [
        {
          title: '分割线',
          component: 'el-divider',//ele分割线
          span: 24,
          icon: 'el-icon-eleme',
          tips: '看我：自定义属性怎么用？',
          params: {
            html: '<h3 style="color:red">分割线标题</h3>',
            contentPosition: "left",
          }
        },
        {
          title: '警告',
          component: 'el-alert',
          labelWidth: '0',
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
      ],
      options: {
        column: [
          {
            type: 'url',
            prop: 'url',
            label: '超链接',
            icon: 'icon-url',
            value: 'http://www.baidu.com',
            span: 24,
            display: true
          },
          {
            prop: 'img',
            type: 'img',
            label: '图片',
            span: '24',
            display: true
          }
        ]
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
