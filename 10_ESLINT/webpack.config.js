const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        /**
         * 先要排除node_modules，eslint只需要检查自己的代码
         * eslint需要设置检查规则， 一般使用airbnb风格，airbnb有eslint-config-airbnb和eslint-config-airbnb-base两个版本，第二个不包括react的语法检查
         * 需要下载 eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import
         *
         * 设置检查规则：
         *  package.json中
         *  "eslintConfig": {
              "extends": "airbnb-base"
            }
         */
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],

  mode: 'development',
};
