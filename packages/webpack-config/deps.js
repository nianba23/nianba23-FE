const { execSync } = require('child_process');

// 定义要安装的依赖包列表
const devDependencies = [
    '@babel/core',
    '@babel/preset-env',
    'autoprefixer',
    'babel-loader',
    'clean-webpack-plugin',
    'css-loader',
    'css-minimizer-webpack-plugin',
    'file-loader',
    'html-webpack-plugin',
    'less',
    'less-loader',
    'mini-css-extract-plugin',
    'postcss-loader',
    'style-loader',
    'terser-webpack-plugin',
    'thread-loader',
    'url-loader',
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'webpack-merge',
    'webpack-parallel-uglify-plugin'
];
const dependencies = ['lodash'];

// 遍历依赖包列表，执行 npm install 命令
devDependencies.forEach(dependency => {
    try {
        console.log(`Installing ${dependency}...`);
        execSync(`npm install --save-dev ${dependency}`, { stdio: 'inherit' });
        console.log(`${dependency} installed successfully.\n`);
    } catch (error) {
        console.error(`Error installing ${dependency}: ${error.message}\n`);
    }
});
dependencies.forEach(dependency => {
    try {
        console.log(`Installing ${dependency}...`);
        execSync(`npm install --save ${dependency}`, { stdio: 'inherit' });
        console.log(`${dependency} installed successfully.\n`);
    } catch (error) {
        console.error(`Error installing ${dependency}: ${error.message}\n`);
    }
});

console.log('All devDependencies installed successfully.');
