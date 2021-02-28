let path = require("path");

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
        use: [
          // 倒序执行
          // 将CSS代码组装成style标签，放进html的head中
          "style-loader",
          // 将CSS转化为js模块，
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 需要安装less和less-loader, 将less转为css
          "less-loader"
        ]
      }
    ]
  },

  mode: "development"
}