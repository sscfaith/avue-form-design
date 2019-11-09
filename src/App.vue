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
