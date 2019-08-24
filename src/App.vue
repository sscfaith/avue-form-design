<template>
  <div id="app">
    <avue-form-design :options="options"
                      storage
                      @submit="handleSubmit"></avue-form-design>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      options: {
        column: [{
          type: 'input',
          label: '用户名',
          prop: 'name',
          span: 12,
          display: true
        }, {
          type: 'password',
          label: '密码',
          prop: 'password',
          span: 12,
          display: true
        }, {
          type: 'dynamic',
          label: '子表单',
          prop: 'dynamic',
          span: 24,
          display: true,
          children: {
            align: 'center',
            headerAlign: 'center',
            column: [{
              type: 'input',
              label: '用户名',
              prop: 'name1',
              display: true
            }, {
              type: 'password',
              label: '密码',
              prop: 'password1',
              display: true
            }]
          }
        }]
      }
    }
  },
  methods: {
    handleSubmit (val) {
      console.log(val);
    },
  }
}
</script>
