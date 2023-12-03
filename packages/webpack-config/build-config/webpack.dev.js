const path = require('path');
const { merge } = require("webpack-merge");
const webpackCommonConf = require("./webpack.common");
const { srcPath, distPath } = require("./paths");
const webpack = require("webpack");

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                include: [path.resolve('src')],
            },
            {
                test: /\.ts?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: 'tsconfig.build.json',
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
                use: 'file-loader'
            }
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
});
