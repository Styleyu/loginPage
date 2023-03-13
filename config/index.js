const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')

const resolveEnv = (env) => process.env[env]

const isProduction = resolveEnv('NODE_ENV') === 'production'
/**
 * !注意对应不同的htmlWebpackPlugin
 */
const config = defineConfig({
  publicPath: resolveEnv('VUE_APP_BASE_URL'),
  outputDir: 'dist',
  filenameHashing: true,
  assetsDir: '[name]',
  devServer: {
    port: resolveEnv('VUE_APP_DEVSERVER_PORT'),
  },
  pages: {
    /* 登录页面 */
    login: {
      entry: 'src/services/login/main.js',
      template: 'public/login/index.html',
      filename: resolveEnv('VUE_APP_LOGIN_LOCATION') + '/index.html',
      title: resolveEnv('VUE_APP_LOGIN_TITLE'),
    },
    /* 后台管理页面 */
    back: {
      entry: 'src/services/back/main.js',
      template: 'public/back/index.html',
      filename: resolveEnv('VUE_APP_BACK_LOCATION') + '/index.html',
      title: resolveEnv('VUE_APP_BACK_TITLE'),
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('_back', resolve('src/services/back'))
      .set('_login', resolve('src/services/login'))
      .set('@', resolve('src'))
    if (isProduction) {
      // 生产环境...
    } else {
      // 开发环境...
    }

  },
  transpileDependencies: true
})

module.exports = config