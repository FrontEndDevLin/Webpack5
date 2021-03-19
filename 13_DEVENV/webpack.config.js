let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

let commonCssConfig = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: "../"
        }
    },
    "css-loader",
    // css兼容性处理
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
                use: commonCssConfig
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssConfig,
                    // "style-loader",
                    // "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8 * 1024,
                    // 转为commonjs规范，否则html引入错误
                    esModule: false,
                    name: "[hash:10].[ext]",
                    outputPath: "./img/",
                    // publicPath: './img/'
                }
            },
            {
                test: /\.html$/,
                loader: "html-withimg-loader",
                // 受url-loader的options.limit参数影响
            },
            // js兼容性处理
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
                                // 指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容到哪个版本的浏览器
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
            },
            // 打包其他资源
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    // esModule: false,
                    outputPath: "./static/",
                    // publicPath: "./static/"
                }
            }
        ]
    },

    plugins: [
        
        // 将生成的css自动引入到html中
        new MiniCssExtractPlugin({
            filename: "./css/app.css"
        }),
        
        // 压缩css 这一步会出现warning
        new OptimizeCssAssetsWebpackPlugin(),
        
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body"
        }),
        
    ],

    mode: "development",
    
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        // 启动gzip压缩
        compress: true,
        port: 4000,
        open: true
    }
}