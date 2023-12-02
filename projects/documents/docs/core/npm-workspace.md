# npm workspaces 教程

npm workspaces 是 npm@7 版本引入的一个特性，使用时请确认自己的版本，node >= 16

workspaces 可以帮助我们来进行多包管理，它可以让多个 npm 包在同一个项目中进行开发和管理变得非常方便：

- 将子包中所有的依赖包都提升到根目录中进行安装，提升包安装的速度
- 初始化后会自动将子包之间的依赖进行关联（软链接）
- 因为同一个项目的关系，所以可以让各个子包共享一些流程，比如：eslint、stylelint、git hooks、publish flow 等


## workspaces 文档
[官方文档](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

## 使用

1. 在项目根目录下的 `package.json` 中配置 `workspaces`
    workspaces 数组里面填写相对根目录的文件夹名称或者是通配符，例如示例中表示位于 `packages` 内的所有文件夹都被视为工作区，只要里面包含有效的 `package.json`
    ```json
    "workspaces": [
        "packages/*"
    ]
    ```
    运行 `npm install`，`./packages` 内的所有包都将创建符号链接到当前目录的 `node_modules` 文件夹里，对于包的使用和查找，和正常安装的 npm 包相同。
2. 在 `packages` 目录下创建相应的子包，每个子包都有自己的 `package.json`
    并且需要配置 `name` 字段，因为 npm 包的名字是唯一的，如果没有配置 name 字段，那么 npm 会报错，还因为在执行指令时通过 name 查找到相应的子包。

    也可以使用 `npm init` 自动定义新工作区，如果不存在文件夹 `myPackage`，会自动创建且生成 `package.json` 文件。同时在根目录的 `package.json` 中添加 `workspaces` 字段
    ```
    npm init -w ./packages/myPackage -y
    ```
3. 安装依赖
    在根目录执行时会安装根目录下所有包的依赖
    ```
    npm install
    ```

    在子包中安装依赖时指定包名
    ```
    npm install repoName -w myPackage
    ```
4. 运行命令
    如果要在子包中运行脚本
    ```
    npm run muScript -w myPackage
    ```

    如果要在所有工作区中运行相同的脚本
    ```
    npm run muScript
    ```
5. 发布包
    发布子包
    ```
    npm publish -w myPackage
    ```

    发布所有子包
    ```
    npm publish
    ```
6. 其他常见操作
    使用 `npm ls` 查看所有工作区中的包。
    使用 `npm outdated` 查看工作区中的包是否有过时的依赖项。

其他操作请参考官方文档
