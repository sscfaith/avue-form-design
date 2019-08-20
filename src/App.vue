<template>
  <div id="app">
    <avue-form-design @submit="handleSubmit"
                      :option="option"></avue-form-design>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        option: {
          column: [{
            type: 'input',
            label: '用户名',
            prop: 'name',
            icon: 'icon-input',
            span: 24,
            display: true
          }, {
            type: 'password',
            label: '密码',
            prop: 'password',
            icon: 'icon-password',
            span: 24,
            display: true
          }]
        }
      }
    },
    methods: {
      handleSubmit(option) {
        console.log(option);
      },
    }
  }
</script>
