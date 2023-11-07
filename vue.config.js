const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'www.astro-otter.local',
      'astro-otter.local'
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: false, // optional
        },
      }
    }
  }
})
