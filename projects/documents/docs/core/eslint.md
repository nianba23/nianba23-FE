# Eslint 教程

Eslint是一个非常好的编程辅助工具，检测和修复代码中的问题，也规避了一些低端错误，一定程度上也能减少代码量，提升代码质量。

## 使用

1. 安装 Eslint

    ```bash
    npm install eslint --save-dev
    ```

2. 创建配置文件

    ```bash
    npx eslint --init
    ```

3. 编辑配置文件

    ```js
    module.exports = {
        'root': true,
        'env': {
            'browser': true,
            'commonjs': true,
            'es2021': true,
            'node': true
        },
        'extends': [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:vue/vue3-recommended',
        ],
        'parser': 'vue-eslint-parser',
        'parserOptions': {
            'parser': '@typescript-eslint/parser',
            'ecmaVersion': 'latest',
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
        }
    }
    ```

4. 创建 eslint 脚本

    ```json
    {
    "scripts": {
        "lint": "eslint --ext .js,.ts,.vue"
    }
    }
    ```

5. 运行 eslint 脚本

    ```bash
    npm run lint
    ```

为了更好地在开发过程中检查或格式化代码，可以集成到编辑器中，并且使用例如 Prettier 插件来格式化代码。

## 规则定制

公共规范并不需要从头到位定制一份很长的 `rules`，需要的是一份`标准规范`。（定制规范不是核心业务，大可不必浪费时间）
所以公共配置的原则就是统一引入业界的标准规范，并根据实际情况做一些规则复写。

规则如下：
- 引入 Eslint 官方推荐的规则
- 引入 Vue 官方推荐的规则
- 引入 Ts官方推荐规则 
- 维护一份少量的自有规则，以达到我们的特殊目的

```js
module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  "rules": {
    // 额外定制规则
  }
}
```