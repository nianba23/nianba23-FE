# 软链接的使用

软链接可以创建文件的引用路径，让一个文件拥有多个访问路径。

## 命令

在  Mac 系统下
```bash
# 创建
ln -s 原文件路径 目标软链接路径

# 查看(查看当前目录下，哪些文件是软链接)
ls -li

# 删除，也可以直接在文件管理器里直接删除
rm 目标软链接路径
```

在 Windows 系统下
```bash
# 创建
mklink 目标软链接路径 原文件路径

# 查看(查看当前目录下，哪些文件是软链接)
dir /AL

# 删除，也可以直接在文件管理器里直接删除
del 目标软链接路径
```

在 node 环境下
```ts
import { existsSync, symlinkSync } from 'fs-extra';
function createSymlink(targetPath: string, linkPath: string) {
    // targetPath 源文件路径、linkPath 软链接路径
    if (!existsSync(linkPath)) {
        try {
            // 注意：Windows 系统下，需要使用 junction 选项，否则会出现错误：
            symlinkSync(targetPath, linkPath, 'junction');
        } catch (error) {
            console.log('error', error);
        }
    }
}
```
