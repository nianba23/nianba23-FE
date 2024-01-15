const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    rules: {
        // Eslint@8.53.0 开始废弃基础的格式配置 https://eslint.org/blog/2023/10/deprecating-formatting-rules/
        // 基础的格式都用 prettier

        // ====> 基础
        'no-console': 0, // 不允许 console
        'no-empty': 1, // 不允许空块语句
        'no-useless-escape': 1, // 禁止不必要的转义字符
        'no-async-promise-executor': 1, // 禁止在 Promise 的执行函数中使用 async 函数
        'no-case-declarations': 1, // 在 case 语句中禁止声明变量
        'no-unreachable': 1, // return null 给警告
        'eqeqeq': 1, // 使用全等操作符（=== 和 !==）
        'prefer-const': 1, // 使用 const 声明那些声明后不再被修改的变量
        // 驼峰命名
        'camelcase': [
            'off',
            {
                properties: 'never', // 属性名称，不强制
                ignoreDestructuring: true, // 忽略解构
                ignoreImports: true, // 忽略导入
                ignoreGlobals: true, // 忽略全局
            },
        ],
        'require-await': 1, // 强制在 async 函数中有 await 表达式，但可能只是为了表明这是一个异步函数
        'consistent-return': 0, // 函数有返回值时，要么指定返回的值，要么不写 return

        // ====> https://eslint.vuejs.org/
        // 模板中每行的最大属性数
        // 'vue/max-attributes-per-line': [
        //     'error',
        //     {
        //         singleline: {
        //             max: 2,
        //         },
        //         multiline: {
        //             max: 1,
        //         },
        //     },
        // ],
        'vue/no-unused-components': isProduction ? 2 : 0, // 如果是生产环境，禁止未使用的组件，否则关闭此规则
        // 规定模板中 html 的缩进
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/html-self-closing': 0, // 在标签上要求或禁止自动闭合

        // ====> https://typescript-eslint.io/rules/#supported-rules
        '@typescript-eslint/type-annotation-spacing': ['warn', { after: true }], // type 前面要有空格
        '@typescript-eslint/no-var-requires': 0, // 禁止使用 var require
        '@typescript-eslint/no-explicit-any': 0, // 禁止使用 any 类型，以后再去掉
        '@typescript-eslint/no-unused-vars': 0, // 禁止声明未使用的变量，以后再去掉
        '@typescript-eslint/no-empty-function': 0, // 不允许空函数，后面再去掉
        '@typescript-eslint/ban-ts-comment': 0, // 禁止使用 @ts-ignore，暂时不能删除
        '@typescript-eslint/no-this-alias': 0, // 禁止将 this 赋值给其他变量，后面在去掉
        '@typescript-eslint/explicit-module-boundary-types': 0, // 公共方法的返回类型声明
        '@typescript-eslint/ban-types': 0, // 是否直接使用 Function 等当作 type
        '@typescript-eslint/triple-slash-reference': 0, // 禁止使用三斜线引用类型导入模块
        '@typescript-eslint/no-namespace': 0, // 禁止使用命名空间
        '@typescript-eslint/no-non-null-asserted-optional-chain': 1, // 使用可选链的时候允许抛出 undefined
        '@typescript-eslint/adjacent-overload-signatures': 0, // 在重载的签名中要求相邻的成员之间有空行
        '@typescript-eslint/no-empty-interface': 1, // 禁止定义空接口
        // 规定末尾逗号的使用
        '@typescript-eslint/comma-dangle': [
            'error',
            {
                arrays: 'always-multiline', // 只有多行的情况下，才需要末尾的逗号，这样的目的是减少 commit 的变更行数
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'only-multiline',
                enums: 'always-multiline',
                tuples: 'only-multiline',
                generics: 'only-multiline',
            },
        ],
        // 规定 ts 中的引号
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: false, // 不允许转义
                allowTemplateLiterals: true, // 允许模板字符串
            },
        ],
    },
    overrides: [
        {
            files: ['*.ts', '*.mts', '*.cts', '*.tsx', '*.vue'],
            // 关闭对未定义变量的检查，因为 ts 会检查
            rules: {
                'no-undef': 'off', // https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            },
        },
    ],
};
