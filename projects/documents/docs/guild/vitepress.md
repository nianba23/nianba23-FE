# VitePress 快速搭建个人站点及部署

## VitePress 文档
[官方文档](https://vitepress.dev/)

## 快速开始

- 初始化项目

    ```bash
    npm init
    ```

- 安装 vitepress 依赖

    ```bash
    # 安装依赖
    npm install --save-dev vitepress
    ```

- 创建文档

    创建 `docs/index.md` 文件并边界内容，文档都放在 `docs` 目录下

    此时文件结构为：
    ```
    ├── docs
    │   ├── index.md
    └── package.json
    ```

- 在 package.json 中添加 vitepress 启动命令

    ```json
    {
    "scripts": {
        "docs:dev": "vitepress dev docs",
        "docs:build": "vitepress build docs",
        "docs:serve": "vitepress serve docs"
    }
    }
    ```
    三个脚本分别代表启动本地文档服务，打包文档，启动打包后（dist）服务

- 启动本地文档服务

    ```bash
    npm run docs:dev
    ```

    便会启动一个 `http:localhost:3000/` 的服务，默认加载 `docs/index.md`

到这里就搭建了一个最简单的站点，其他功能请参考官方文档

## 配置

在 docs 目录下创建一个 `.vitepress` 文件夹，在其中创建 `config.js` 文件

此时文件结构为：
```
├── docs
│   ├──.vitepress
│   │   └── config.js
│   ├── index.md
└── package.json
```

config.js 是站点的必要配置文件

```js
module.exports = {
  title: 'Hello VitePress', // 站点标题
  description: 'Just playing around.', // 标签描述
}
```

- 左侧导航

    title 和 log 对应导航栏左侧的图标和标题
    其中 logo 的路径对应的是 public 目录下的文件，如果没有则需要在 public 目录下创建 logo.png 文件

    ```js
    export default {
    themeConfig: {
        siteTitle: "Me",
        logo: '/logo.png',
    },
    };
    ```

    此时目录结构为：
    ```
    ├── docs
    │   ├──.vitepress
    │   │   └── config.js
    │   ├── public
    │   │   └── logo.png
    │   ├── index.md
    └── package.json
    ```

- 右侧导航

    在 `themeConfig.nav` 配置右侧导航，可以配置本地 md 文档和外部链接

    ```js
    themeConfig: {
        siteTitle: "Me",
        logo: "/logo.png",
        nav: [
        { text: "Guide", link: "/guide/" },
        { text: "Github", link: "https://github.com/" },
        // 下拉选项，此处做配置示例，不创建文件了
        {
            text: "Drop Menu",
            items: [
            { text: 'Item A', link: '/item-1' },
            { text: 'Item B', link: '/item-2' },
            { text: 'Item C', link: '/item-3' },
            ],
        },
        ],
    }
    ```

    同时要在 docs 下创建 `guild/index.md` 文件

    此时目录结构为：
    ```
    ├── docs
    │   ├──.vitepress
    │   │   └── config.js
    │   ├── guide
    │   │   └── index.md
    │   ├── public
    │   │   └── logo.png
    │   ├── index.md
    └── package.json
    ```

- 社交链接

    在 `themeConfig.socialLinks` 配置社交链接，具体支持哪些链接请查看文档

    ```js
    themeConfig: {
        socialLinks: [
            { icon: "github", link: "https://gitee.com/geeksdidi" },
        ],
    }
    ```

- 侧边栏

    在 `themeConfig.sidebar` 配置侧边栏，配置方式和 `nav` 配置类似

    以下只是配置示例，需要创建 `link` 对应的文件
    ```js
    themeConfig: {
        // 侧边栏，包含 key 路径的才会出现侧边栏
        sidebar: {
            '/guild/': [
                {
                    text: 'git 教程',
                    items: [
                        { text: 'git', link: '/guild/git' },
                    ],
                },
                {
                    text: 'vitepress 教程',
                    collapsed: true
                    items: [
                        { text: 'vitepress', link: '/guild/vitepress' },
                    ],
                },
            ],
        },
    }
    ```

    配置可折叠侧边栏可以在配置中添加 `collapsed` 配置，默认全部展开，如果需要关闭状态只需要 `collapsed: true`

- 首页布局

    站点首页就是 `docs/index.md`，vitepress 提供了一个默认的主页布局，详细配置参考官方文档

    ```md
    ---
    layout: home

    hero:
    name: VitePress
    text: Vite & Vue powered static site generator.
    tagline: Lorem ipsum...
    image:
        src: /logo.png
        alt: VitePress
    actions:
        - theme: brand
        text: Get Started
        link: /guide/what-is-vitepress
        - theme: alt
        text: View on GitHub
        link: https://github.com/vuejs/vitepress

    features:
    - icon: 🛠️
        title: Simple and minimal, always
        details: Lorem ipsum...
    - icon: 🖖
        src: /cool-feature-icon.svg
        title: Another cool feature
        details: Lorem ipsum...
    - icon: 🛠️️
        dark: /dark-feature-icon.svg
        light: /light-feature-icon.svg
        title: Another cool feature
        details: Lorem ipsum...
    ---
    ```

## 部署到 GitHub Pages

- 首先需要在 github 新建一个仓库，因为要使用 GitHub Pages，所以仓库命名需要为 `[username].github.io` 的形式。用于放 vitepress 生成的 dist 文件夹下的内容。
- 在仓库的 `Settings-Pages` 中进行配置，`branch` 中选择主分支，根目录选择 `/(root)`。
如果需要配置到其他目录也可以，但需要在 `config.js` 中配置 `base: '/<repo>/'`。
- 最后打包后的 dist 下的文件都推送到`[username].github.io`仓库
    vitepres 官网提供了一个脚本文件 `deploy.sh` 可以直接使用，只需要在仓库根目录下执行即可

    ```bash
    #!/usr/bin/env sh

    # 忽略错误
    set -e

    # 构建
    npm run docs:build

    # 进入待发布的目录
    cd docs/.vitepress/dist

    # 如果是发布到自定义域名
    # echo 'www.example.com' > CNAME

    git init
    git add -A
    git commit -m 'deploy'

    # 如果部署到 https://<USERNAME>.github.io
    # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

    # 如果是部署到 https://<USERNAME>.github.io/<REPO>
    # git push -f git@github.com:<USERNAME>/<REPO>.git main:yourBranch

    cd -
    ```

这样就可以通过 `https://<username>.github.io/` 访问
