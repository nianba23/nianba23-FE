const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath } = require('./paths');

module.exports = {
    entry: {
        index: join(srcPath, 'index'),
        other: join(srcPath, 'other'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ],
    },
    plugins: [
        // 单入口
        // new HtmlWebpackPlugin({
        //     template: join(srcPath, 'index.html'),
        //     fileName: 'index.html',
        // }),

        // 多入口
        new HtmlWebpackPlugin({
            template: join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即 entry 的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        }),
    ],
};
