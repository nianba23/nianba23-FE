module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended', // eslint 官方
        'plugin:@typescript-eslint/recommended', // ts 官方
        'plugin:vue/vue3-recommended' // vue 官方
        // '@nianba23-fe/eslint-config/onecode'
    ],
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'parser': '@typescript-eslint/parser',
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            'modules': true,
        },
    },
    'plugins': [
        '@typescript-eslint',
        'vue'
    ],
    'globals': {
        // 定义一些全局变量，这些变量在代码中使用但 eslint 环境未定义
    },
    'rules': {
        // 自定义项目中得规则
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'avoidEscape': false,
                'allowTemplateLiterals': true,
            },
        ],
    }
}
