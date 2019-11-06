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
        group: [
          {
            icon: 'el-icon-info',
            label: '分组1',
            prop: 'group1',
            column: [{
              label: '内容1',
              prop: 'text1',
            }]
          }, {
            icon: 'el-icon-info',
            label: '分组2',
            prop: 'group2',
            column: [{
              label: '选项卡2',
              prop: 'text2',
            }, {
              label: '选项卡3',
              prop: 'text3',
            }]
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
