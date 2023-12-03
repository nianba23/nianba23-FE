const {  merge } = require("webpack-merge");
const webpackCommonConf = require("./webpack.common");
const { srcPath, distPath } = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contenthash:8].js', // 单入口，打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.xxx.com', // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 使用 thread-loader 加速 Babel 编译
                use: [
                  // thread-loader 需要放在最前面
                  'thread-loader',
                  'babel-loader',
                ],
                include: srcPath,
              },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,
                        // 打包到 img1 目录下
                        outputPath: '/img1/',
                    }
                }
            },
            {
                // 抽离 css
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 这里不再用 style-loader 了
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                // 抽离 less
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader, // 这里不再用 style-loader 了
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production'),
        }),

        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),

        // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        }),
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin({})],
    },
});
