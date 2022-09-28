const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    mode: "production", // 打包时模式就要切换成生产模式
  },
  // publicPath生产模式采用相对路径,不然文件放到服务器指定目录下会找不到,开发模式用绝对路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist", // 打包后文件输出的目录名
  // 打包后静态资源配置为相对路径
  chainWebpack: (config) => {
    config.resolve.alias.set("img", path.resolve("src/assets"));
  },
  // 下面的都不重要    重点是上面几点配置
  lintOnSave: true,
  devServer: {
    host: "127.0.0.1",
    port: 9090,
    open: true, //启动项目自动打开浏览器
    proxy: {
      [process.env.VUE_APP_MAPPING_URL]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        secure: false,
        ws: false,
        pathRewrite: {
          ["^" + process.env.VUE_APP_MAPPING_URL]: "",
        },
      },
    },
  },
  // 全局less插件配置
  pluginOptions: {
    // style-resources-loader配置
    "style-resources-loader": {
      // 预处理程序选择 less
      preProcessor: "less",
      // 参数
      patterns: [
        // 项目根路径下 /src/styles/ 的所有less文件
        // 指定某一个的话可以具体设置为某一个less文件
        path.resolve(__dirname, "./src/styles/*.less"),
      ],
    },
  },
});
