# 简介

一些工具函数、数据结构、算法实现

工具函数最好做单元测试：
1. 安装依赖
`npm install --save-dev jest ts-jest @types/jest`
2. 初始化 jest 配置文件，具体配置自行参考官方文档
注意：这里使用 ts 编写测试用例，需要先初始化 ts 配置文件
`npm ts-jest config:init`
3. 编写测试用例
`npm test`
`npx jest src/tests/data-structure-algorithms.test.ts`
