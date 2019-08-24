module.exports = {
  productionSourceMap: false,

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
    }
  },

  chainWebpack: (config) => {
    config.externals({
      'vue': 'Vue',
      'element-ui': 'ElementUI',
    })
  },

  devServer: {
    open: true
  },

  css: {
    extract: false
  }
}
