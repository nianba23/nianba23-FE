/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    // 指定源文件和测试文件的根目录
    roots: ['<rootDir>'],
    // 指定测试环境，可以是 "node"、"jsdom" 等
    testEnvironment: 'node',
    // 匹配测试文件的正则表达式
    testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
    // TypeScript 文件的后缀
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // 转换器配置，用于处理 TypeScript 文件
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.js$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/tsconfig.json',
        },
    },
    transformIgnorePatterns: ['node_modules'],
};
