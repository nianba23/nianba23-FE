# husky + lint-staged 教程

在 Eslint 基础上，结合 husky + lint-staged 工具，可以在代码提交之前自动运行代码检查和格式化工具，确保提交的代码符合规范。

[husky](https://www.npmjs.com/package/husky) 是一个处理 Git hooks 的工具，对git 执行的一些命令，通过对应的 hooks 钩子触发，执行自定义的脚本程序。比如在 commit 之前进行一次 Eslint 的校验。

[lint-staged](https://www.npmjs.com/package/lint-staged) 只找出 git add . 中暂存区的文件，只对过滤出的文件执行脚本，而不必每次 commit 都进行全量验证。

## 使用

1. 安装 husky 和 lint-staged

    ```bash
    npm install --save-dev husky lint-staged
    ```

2. 在 package.json 中添加 husky 相关配置

    在每次提交代码之前，lint-staged 会运行 ESLint 来检查代码是否符合规范，如果不符合，则会阻止提交。

    ```json
    {
    "husky": {
        "hooks": {
        "pre-commit": "lint-staged"
        }
    },
    }
    ```

    初始化 husky 配置，会在根目录生成 .husky 目录，里面有初始化配置 pre-commit 的脚本。
    ```bash
    npm husky-init
    ```

    也可以配置指令 `"prepare": "husky install"`，那么 husky 将在安装时自动运行，将在 `.git/hooks/pre-commit` 中创建一个软连接，指向 `.husky/pre-commit` 脚本，脚本中执行 `npx lint-staged`，也是在每次提交时执行检查。

    .husky/pre-commit
    ```sh
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"
    npx lint-staged
    ```

3. 在 package.json 中添加 lint-staged 相关配置

    ```json
    {
    "lint-staged": {
        "packages/**/*.{js,vue,ts,tsx}": [
        "NODE_ENV=production eslint --fix --ext .js,.ts,.vue"
        ]
    }
    }
    ```

husky 一般在终端上可以顺利运行，但使用 git 图形工具时，可能会遇到一些问题，可能需要一些额外配置，[详见](https://typicode.github.io/husky/#/?id=troubleshoot)。
还可以结合其他一些工具，请自行查阅：

- prettier：代码格式化工具
    代码风格管理，更好的代码风格效果
- editorconfig：文件代码规范
    保持多人开发一致编码样式
- commitlint：代码提交检测
    检测git commit 内容是否符合定义的规范
- commitizen：代码提交内容标准化
    提示定义输入标准的git commit 内容
