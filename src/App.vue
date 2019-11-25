<template>
  <div id="app">
    <avue-form-design :options="options"
                      @submit="handleSubmit"></avue-form-design>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      options: {
        column: [
          {
            type: 'url',
            prop: 'url',
            label: '超链接',
            icon: 'icon-url',
            valueDefault: 'http://www.baidu.com',
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
    handleSubmit (val) {
      console.log(val);
    },
  }
}
</script>
