# vite 教程

[官方文档](https://cn.vitejs.dev/)

## 快速上手

1. 创建 vite 项目

```bash
npm create vite@latest my-vue-app
```

```bash
npm create vite@latest my-vue-app -- --template vue-ts
```

2. 命令行

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

更多命令行配置详见[命令行界面](https://cn.vitejs.dev/guide/cli.html)

## 其他

- 使用 vue-cli 搭建的工程，里边用的是 webpack 作为构建工具，可以支持编译时态对目录的读取，通过 require.context 读取目录。
- 使用 vite 搭建的工程，要编译时态读取目录，通过 import.meta.glob 读取目录。
