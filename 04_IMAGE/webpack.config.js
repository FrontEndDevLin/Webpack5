let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // 缺点：不能处理html的img图片，需要使用html-loader

        test: /\.(jpg|png)$/,
        // use: ["url-loader"],
        loader: "url-loader",

        options: {
          // 使用limit字段时需要先下载file-loader
          // limit字段决定当图片小于给定的大小(10kb)时，将图片转为base64，否则不做转换
          // limit字段不设置时，图片默认转为base64
          limit: 10 * 1024,

          // 坑：url-loader默认使用es6模块化规范解析，html-withimg使用的是commonjs规范，所以需要关闭url-loader的默认解析方式
          esModule: false,

          // 给图片重命名
          // 取哈希值前十位
          name: "[hash:10].[ext]"
        },

      },
      {
        test: /\.html$/,
        // 解析html代码中的img标签，然后交给url-loader处理
        // 坑：url-loader默认使用es6模块化规范解析，html-withimg使用的是commonjs规范，所以需要关闭url-loader的默认解析方式
        loader: "html-withimg-loader",
        // loader: "html-loader",
        // options: {
        //   esModule: false
        // },
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  mode: "development"
};