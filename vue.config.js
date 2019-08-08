module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
  //   }
  // },
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'element-ui': 'ElementUI',
    })
  },
}
