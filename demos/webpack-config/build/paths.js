const { join } = require('path');

const srcPath = join(__dirname, '../src');
const distPath = join(__dirname, '../dist');

module.exports = {
    srcPath,
    distPath,
};
