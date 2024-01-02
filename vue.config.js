const { defineConfig } = require('@vue/cli-service')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html', 'svg']

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
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
})
