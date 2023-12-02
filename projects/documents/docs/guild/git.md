# Git 教程

## Git 文档
[官方文档](https://git-scm.com/docs)

## git branch
- git branch 查看本地分支
- git branch -r 查看远程分支
- git branch -a 查看本地&远程分支
- git branch -d xxx 删除本地分支
- git branch -r | grep main  查看远程的包含 main 的分支
- git branch | grep main | xargs git branch -D 批量删除本地分支
- git branch -a | grep -v -E 'master|develop' | xargs git branch -D // 只保留 master 等分支
- git branch -r | grep -v -E 'master|develop' | sed 's/origin\///g' | xargs -I {} git push origin :{}
- git branch -r | grep 'main' | xargs -I {} basename {} | xargs -I {} git push origin :{} // 批量删除远程分支
- git remote prune origin  // 刷新一下分支列表

## git checkout
- git checkout xxx 切换到某个分支
- git checkout . 放弃本次修改
- git checkout -b xxx origin/xxx 创建一个和远程分支关联的分支
- git checkout -b xxx 创建一个新分支

## git merge 
- git merge branchName 将 branchName 分支的更改合并到当前分支
- git merge --abort 取消上一次合并

## git clone
- git clone repositoryUrl 克隆远程仓库到当前目录
- git clone -b branchName repositoryUr 克隆指定分支

## git pull
- git pull origin branchName 将远程分支拉取到本地当前分支
- git pull origin branchName --force 强制将远程分支拉取到本地当前分支
- git pull --rebase origin branchName 将远程分支拉取到本地分支，并在本地分支上执行 rebase 操作

## git add
- git add . 将所有修改添加到暂存区
- git add fileName 将指定文件添加到暂存区

## git commit
- git commit -m "Commit message" 将提交暂存区的所有更改附带一条信息进行提交

## git push
- git push origin branchName 将本地分支推送到远程分支
- git push -u origin branchName 将本地分支推送到远程仓库，并将远程分支设置为相同名称
- git push -f origin branchName 强制推送到远程仓库，即使有冲突
- git push origin --delete branchName 删除远程分支

## git tag
- git tag -a tagName -m '标签的说明' // -a annotated
- git push origin tagName // 推送到远程

## git log
- git log --author=alan // 过滤作者名称
--oneline // 每条记录只显示一行

## git stash
- git stash save {name}
- git stash list
- git stash pop 
- git stash apply {index}
- git stash drop {index}

## git reset
- git reset --soft HEAD~1 撤销上一次的提交

## git cherry-pick 
- git cherry-pick commitId1 commitId2 将其他分支的 commit 摘取过来

## .gitignore
- 以斜杠“/”开头表示目录
- 以星号“*”通配多个字符
- 以问号“?”通配单个字符
- 以方括号“[]”包含单个字符的匹配列表
- 以叹号“!”表示不忽略(跟踪)匹配到的文件或目录
- git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效
- 只能作用于 Untracked Files，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）

## review pr

如果是简单的功能我们可以直接通过 PR 地址进行review，对于复杂一些的功能，我们应该在本地对功能进行验证。此时可以使用 Git 命令将当前 PR 拉到本地进行验证。

```
git fetch origin pull/{id}/head:{branchname} 
```

- id: PR 的id
- branchname: 你本地创建的新分支的名称