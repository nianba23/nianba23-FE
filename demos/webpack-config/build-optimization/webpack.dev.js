const { merge } = require("webpack-merge");
const webpackCommonConf = require("./webpack.common");
const { srcPath, distPath } = require("./paths");
const webpack = require("webpack");

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'], // 开启缓存
                include: srcPath,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('development')
        }),
    ],
    devServer: {
        static: distPath, // 提供静态文件的目录
        open: true, // 启动后自动打开浏览器
        compress: true, // 启动 gzip 压缩
        hot: true, // 启动热更新
        port: 8080,
        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',
            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': '',
                },
            },
        },
    },
    // 自动刷新
    // watch: true, // 开启监听，默认为 false，开启了 devServer 就不需要了
    // watchOptions: {
    //     ignored: /node_modules/, // 忽略哪些
    //     // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    //     // 默认为 300ms
    //     aggregateTimeout: 300,
    //     // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    //     // 默认每隔1000毫秒询问一次
    //     poll: 1000
    // }
});
