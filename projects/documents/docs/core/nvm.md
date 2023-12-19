# nvm 教程

nvm 是 Node 版本管理器，可以帮助我们更方便地安装和切换 Node.js 版本。

## windows 安装

> 在安装 nvm 之前，需要先将本地的 node 卸载，避免一些莫名其妙的问题，让 nvm 完全接管电脑的 node。删除包括`C:\Users\用户名`文件夹下的`.npmrc`，环境变量中 nvm 相关的配置。

- Windows [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

1. 到官网下载 `nvm-setup.zip` 文件，解压到任意目录，执行 `nvm-setup.exe`
    安装过程中选择 nvm 安装路径和 nodejs 安装路径，如：`D:\Program\nvm`、`D:\Program\nodejs`
2. 安装完成后在命令行终端执行 `nvm version` 查看是否安装成功，显示版本号说明安装成功
    nvm 安装成功会自动配置 nvm 相关的环境变量
3. 配置淘宝源
    找到 nvm 安装路径下的 `settings.txt` 文件，在文件中添加如下内容：
    ```
    node_mirror: https://npm.taobao.org/mirrors/node/
    npm_mirror: https://npm.taobao.org/mirrors/npm/
    ```
4. 安装 node
    在命令行终端执行 `nvm list available` 可以查看所有可安装的版本
    选择一个版本进行安装，安装 node 时会自动安装 npm，如安装 18.17.0 版本：
    ```
    nvm install 18.17.0
    ```
5. 使用安装的 node 版本
    ```
    nvm use 18.17.0
    ```
    使用后可以在命令行终端执行 `node -v` 查看当前使用的 node 版本号
    执行 `nvm list` 可以查看当前已安装的所有 node 版本，如果需要切换到其他版本，只需要执行 `nvm use 版本号` 即可

### 配置全局 npm

nvm 管理多个版本的 node，如果每次安装一个 node 版本都要再全局安装一堆包很麻烦，所以需要有一个 npm 可以让每个版本的 node 共用。

1. 设置使用 npm 下全局安装的包路径
    `npm config set prefix "D:\Program\nvm\npm"`
2. 全局安装 npm
    设置全局安装时，不同的 node 版本都是用这个 npm
    `npm install npm -g --registry=https://registry.npm.taobao.org`
    要更新全局的 npm 的话，先删除全局路径（上一个命令设置的地址，也可以 `npm config ls` 查看）下的 npm，然后再执行一次这个命令即可
3. 设置环境变量
    在用户变量中添加 `NPM_HOME=D:\Program\nvm\npm`，path 中添加 `%NPM_HOME%`（`%NPM_HOME%` 要添加在 `%NVM_SYMLINK%` 之前，避免 npm 访问的是 node 自带的 npm 包管理工具）

> 没有配置 NODE_PATH 环境变量，nodejs 会使用默认的模块解析规则来查找模块。默认情况下，nodejs 会查找当前目录下的 node_modules 文件夹，然后逐级向上查找，知道找到根目录未知。如果全局安装了某个模块，而没有配置 NODE_PATH 环境变量，nodejs 可能无法找到这些全局模块，从而导致模块加载失败。
不过，我们使用 nvm 安装或使用 node 版本时，nvm 会自动设置相关的环境变量，指向全局 npm 下的 node_modules 文件夹，如："D:\Program\nvm\npm\node_modules"，所以不需要再配置 NODE_PATH 环境变量。

## Macos 安装

〉 同样保证电脑上没有安装过 node 环境，且保证已安装了 git（可以参考使用XCode、使用brew、官网下载安装包）。
如果安装了 node，则彻底删除 `sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}`

- Mac  [nvm](https://github.com/nvm-sh/nvm)

1. 下载 nvm 安装脚本
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    ```
    其中 v.0.39.0 是版本号，如果需要安装其他版本，可以替换 v0.39.0 为其他版本号
    如果报错失败或连接不到远程，可以先在 host 文件中配置 `185.199.109.133 raw.githubusercontent.com`
    正常安装成功后会自动在全局配置文件中配置好相应的环境变量，如果不可以的话在参考下面步骤 2、3手动配置环境变量
2. 配置 .bash_profile
    ```
    cd ~/.bash_profile
    ```
    然后将下面的配置信息输入到文件
    ```
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    ```
    然后刷新环境变量
    ```
    source ~/.bash_profile
    ```
3. 配置 .zshrc
    ```
    cd ~/.zshrc
    ```
    然后将下面的配置信息输入到文件
    ```
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    ```
    然后刷新环境变量
    ```
    source ~/.zshrc
    ```
4. 查看 nvm 版本
    ```
    nvm -v
    ```
5. 安装成功后就可正常安装 node
    ```
    nvm install 18.17.0
    ```

## nvm 常用命令

| 命令	| 说明 |
| --- | --- |
| nvm list |	查看已经安装的版本 |
| nvm list installed |	查看已经安装的版本 |
| nvm list available |	查看网络可以安装的版本 |
| nvm install [version] |	安装指定版本的node |
| nvm on |	打开nodejs版本控制 |
| nvm off |	关闭nodejs版本控制 |
| nvm proxy [url] |	查看和设置代理 |
| nvm node_mirror [url] |	设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/ |
| nvm npm_mirror [url] |	设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是：https://github.com/npm/| npm/archive/. |
| nvm uninstall |	卸载指定的版本 |
| nvm use [version] |	切换指定的node版本 |
| nvm root [path] |	设置和查看root路径 |
| nvm version |	查看当前的版本 |

## 卸载

1. 先将本地的 node 卸载，删除包括`C:\Users\用户名`文件夹下的`.npmrc`和环境变量中 nvm 相关的配置
2. 直接删除 nvm 安装目录

## 其他

由于团队成员使用的 node 版本不同意或每个项目所要求的 node 版本不同，所以团队统一使用 nvm 来管理 node 的版本，这样只需要在每个项目根目录下创建 `.nvmrc` 文件，并写入当前项目需要的 node 版本号即可。

.nvmrc 文件示例：
```
18.0.0
```

当拉取了项目最新代码，在进行任何操作之前，先执行一次 `nvm use`，就会读取 `.nvmrc` 文件中的版本信息，并切换到相应的 node 版本,如果 `.nvmrc` 文件中的版本未安装，nvm 会尝试下载并安装该版本

> windows 版本的 nvm 不支持 .nvmrc 文件，所以使用 windows 的同学需要手动补充好完整版本，如执行 nvm use 14.20.1 来指定 node 版本。
[点击查看具体原因](https://github.com/coreybutler/nvm-windows/wiki/Common-Issues#why-isnt-nvmrc-supported-why-arent-some-nvm-for-macoslinux-features-supported)

