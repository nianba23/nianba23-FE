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
        // filename: 'bundle.[contenthash:8].js', // 单入口，打包代码时，加上 hash 戳
        filename: '[name].[contenthash:8].js', // name 即多入口时 entry 的 key
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
                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
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

        // 忽略 moment 下的 /locale 目录
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/, // 忽略 "locale" 文件夹
            contextRegExp: /moment$/, // 忽略包含 "moment" 的路径
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

        // 分割代码块
        splitChunks: {
            /**
             * initial 入口chunk，对于异步导入的文件不处理
                async 异步chunk，只对异步导入的文件处理
                all 全部chunk
             */
            chunks: 'all',
            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: 1, // 权重越高越优先抽离
                    test: /node_modules/,
                    minChunks: 1, // 最小公用次数
                },
                // 公共的模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次
                }
            },
        },
    },
});
