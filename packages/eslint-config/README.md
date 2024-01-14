# ESLint config

[使用教程](https://nianba23.github.io/core/eslint.html)

## 参考链接

- [node exports](https://nodejs.org/api/packages.html#package-entry-points)
- [eslint](https://eslint.org/)
- [typescritp-eslint](https://typescript-eslint.io/docs/linting/)
- [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)

## 其他

**规则值说明**

- "off" 或 0: 表示关闭该规则。ESLint 不会对此规则做任何检查。
- "warn" 或 "warning" 或 1: 表示开启该规则，但是只发出警告，不会阻止代码的执行。
- "error" 或 2: 表示开启该规则，并将违反规则的地方视为错误。在代码中存在违规情况时，ESLint 会报告错误并且可能会阻止代码的执行（取决于配置）。

**关闭规则验证**
- 当前文件： /* eslint-disable no-console */
- 下一行：   /* eslint-disable-next-line */
- 当前行：   /* eslint-disable-line no-alert */

如果规则不生效，可以按 cmd + p 唤起功能搜索面板，按 F1，选择 Eslint: restart eslint server。
