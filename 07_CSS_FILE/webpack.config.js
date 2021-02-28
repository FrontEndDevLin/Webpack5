let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
// mini-css-extract-plugin  提取CSS文件插件
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let commonCssLoaders = [
  // 创建style标签，插入html文档中，不推荐使用
  // "style-loader",
  // 使用 MiniCssExtractPlugin.loader 取代
  MiniCssExtractPlugin.loader,
  "css-loader"
];

module.exports = {
  entry: "./src/js/index.js",
  
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: commonCssLoaders
      },
      {
        test: /\.less$/,
        use: [
          ...commonCssLoaders,
          "less-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    }),

    // 将生成的css自动引入到html中
    new MiniCssExtractPlugin({
      filename: "css/app.css"
    })
  ],

  mode: "development"
};