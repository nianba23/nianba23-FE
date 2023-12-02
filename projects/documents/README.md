##简介

vitepress 搭建的文档站点

`node` 版本需要在 16 以上。 推荐使用 `nvm` 来管理 `node` 版本。

根据个人需要进行配置，参考[VitePress 文档](https://vitepress.dev/reference/site-config)

### 部署到 GitHub Pages

1. 新建一个仓库，用于存放项目 build 生成后的 dist 文件夹内容，仓库命名 `[username].github.io`，这样就可以通过 `https://<username>.github.io/` 访问。
如果要部署到其他目录，例如 `https://<username>.github.io/<repo>/`，需要在 `config.js` 中配置 `base: '/<repo>/'`。
2. 打开新建的仓库的 `Settings-Pages` 进行配置
3. 将本项目 build 后的 dist 下的文件推送到新建的仓库中
也可以执行官网提供的 `deploy.sh` 脚本文件快速发布
也可以通过持续集成的配置，每次 push 代码时自动运行脚本
4. 访问 `https://<username>.github.io/` 即可看到效果
