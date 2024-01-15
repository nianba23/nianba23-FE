const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath } = require('./paths');

// TODO: 需要在 package.json 中引入新的库
module.exports = {
    entry: join(srcPath, 'index'),
    cache: {
        type: 'filesystem',
        cacheDirectory: resolve(__dirname, '../.temp_cache'),
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: join(srcPath, 'index.html'),
            fileName: 'index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts','.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('../src'),
	        'root': resolve('../')
        }
    }
};
