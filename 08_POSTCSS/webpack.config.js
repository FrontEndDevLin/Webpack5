// css兼容性处理

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

// postcss-loader根据package.json -> browserslist -> development中的配置编译CSS
// process.env.NODE_ENV = "development";

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
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",

          /**
           * css兼容性处理：postcss --> postcss-loader postcss-preset-env,
           * postcss-preset-env从package.json等文件中帮助postcss-loader找到browserslist,
           * postcss-loader根据browserslist做相应兼容性处理
           * 默认使用production生产环境配置，
           * 需要指定开发环境需要配置process.env.NODE_ENV = "development"
           * 
           * 写法1
           * "browserslist": [
              ">0.1%",
              "not dead",
              "not op_mini all"
            ]

            写法2
            "browserslist": {
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              "production": [
                ">0.1%",
                "not dead",
                "not op_mini all"
              ]
            }
           * 
           * 
           * 
           */
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env"
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env"
                  ]
                ]
              }
            }
          },
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

    new MiniCssExtractPlugin({
      filename: "css/app.css"
    })
  ],

  mode: "development"
};