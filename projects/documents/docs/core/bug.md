# 踩坑

记录平常遇到的一些坑点、技术点，以备后面查阅。

## sharp 包安装失败

1. pnpm、npm、yarn 时，github 连接失败无法下载 sharp 包的解决方案，未遇到此情况请勿尝试

解决方法：

在命令行分别输入
```
pnpm config set sharp_binary_host=https://npm.taobao.org/mirrors/sharp
pnpm config set sharp_libvips_binary_host=https://npm.taobao.org/mirrors/sharp-libvips
```

完成后再去执行 `pnpm i`

2. pnpm 安装 sharp 安装报错解决方案（未报错的用户请勿尝试）！：

控制台输入
`pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"`
`pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"`

也可以用node20 cnpm9.4安装 （当然还是推荐pnpm，不过可能出现sharp安装的问题）
