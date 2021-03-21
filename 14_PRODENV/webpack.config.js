// 生产环境综合配置

let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

let commonCssLoaders = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../"
    }
  },
  "css-loader",
  // css兼容
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
];

module.exports = {
  entry: "./src/js/index.js",

  output: {
    filename: "bundle.js",
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
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",
          outputPath: "./img"
        }
      },
      {
        test: /\.html$/,
        loader: "html-withimg-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./font"
        }
      },
      // js兼容
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // 按需加载
                useBuiltIns: "usage",
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17"
                }
              }
            ]
          ]
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      minify: {
        // 去空格
        collapseWhitespace: true,
        // 去注释
        removeComments: true
      }
    }),

    new MiniCssExtractPlugin({
      filename: "./css/app.css"
    }),

    // 压缩css 这一步会出现warning
    new OptimizeCssAssetsWebpackPlugin(),

    
  ],

  mode: "production",

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true, // 启用gzip压缩
    port: 4000,
    open: true
  }
}