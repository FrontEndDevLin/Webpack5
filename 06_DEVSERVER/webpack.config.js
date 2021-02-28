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
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // 插入body最后，默认在head标签后面
      inject: "body"
    })
  ],

  mode: "development",

  // webpack5使用 npx webpack serve
  // 自动编译到内存中
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    // 启用gzip压缩
    compress: true,
    // 端口号
    port: 4000,
    // 自动打开默认浏览器
    open: true
  }
};