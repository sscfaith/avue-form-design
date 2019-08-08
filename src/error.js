import Vue from 'vue';

Vue.config.errorHandler = () => {
  Vue.nextTick(() => {
    if (process.env.NODE_ENV === 'production') console.log("error")
  })
}
