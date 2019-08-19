<template>
  <div id="app">
    <avue-form-design @submit="handleSubmit"
                      :option="option"></avue-form-design>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      option: {
        column: [{
          label: '姓名',
          prop: 'name'
        }, {
          label: '密码',
          prop: 'password',
          type: 'password'
        }]
      }
    }
  },
  methods: {
    handleSubmit (option) {
      console.log(option);
    },
  }
}
</script>
