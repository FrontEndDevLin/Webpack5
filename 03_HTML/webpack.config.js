let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * loader: 下载 -> 使用
 * plugins: 下载 -> 引入 -> 使用
 */

module.exports = {
  entry: "./src/index.js",
  
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },

  plugins: [
    // 生成一个空html文件，并引入打包后的js文件
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  mode: "development"
};