const { merge } = require("webpack-merge");
const webpackCommonConf = require("./webpack.common");
const { srcPath, distPath } = require("./paths");
const webpack = require("webpack");

// 使用 dll，第二，引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/ // 使用 dll，第三，不要再转换 node_modules 的代码
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('development')
        }),
        // 使用 dll，第四，告诉 webpack 使用哪些 dll 包
        new DllReferencePlugin({
            manifest: require(join(distPath, 'react.manifest.json')),
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
