import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
    defineConfig({
        title: 'nianba23', // 站点标题
        description: 'nianba23 doc', // meta 标签描述
        themeConfig: {
            // 左上角 logo 和 title
            siteTitle: 'nianba23',
            logo: '/logo.jpg',
            // 社交链接
            socialLinks: [{ icon: "github", link: "https://github.com/nianba23", }],
            // 上方右侧导航
            nav: [
                { text: '文档', link: '/guild/', activeMatch: '^/guild/' },
                { text: '基建', link: '/core/', activeMatch: '^/core/' },
                // {
                //     text: 'Drop Menu',
                //     items: [
                //         { text: 'Item 1', link: '/guild/drop-menu/item-1' },
                //         { text: 'Item 2', link: '/guild/drop-menu/item-2' },
                //         {
                //             items: [
                //                 { text: "Item 11", link: "/guild/drop-menu/item-1" },
                //             ],
                //         },
                //         {
                //             items: [
                //                 { text: "Item 22", link: "/guild/drop-menu/item-2" },
                //             ],
                //         },
                //     ],
                // },
            ],
            // 侧边栏，包含 key 路径的才会出现侧边栏
            sidebar: {
                '/guild/': getGuildSidebar(),
                '/core/': getCoreSidebar(),
            },
            // 本地搜索，也可以使用 algolia 等插件
            search: {
                provider: 'local',
            },
            footer: {
                message: '',
                copyright: 'MIT Licensed | Copyright © 2023-present nianba23 FE'
            },
        },
    })
)

function getGuildSidebar() {
    return [
        {
            text: '文档',
            items: [
                { text: 'Git', link: '/guild/git' },
                { text: 'VitePress', link: '/guild/vitepress' },
                { text: 'Mermaid', link: '/guild/mermaid' },
            ],
        },
        {
            text: '记录',
            items: [
                { text: '踩坑', link: '/guild/bug/index' },
                { text: '软连接', link: '/guild/bug/symLink' },
            ],
        },
        {
            text: '分享',
            items: [
                { text: 'JSON Schema', link: '/guild/share/json-schema' },
                { text: 'Mac 装机', link: '/guild/share/setup-mac' },
            ],
        }
    ];
}

function getCoreSidebar() {
    return [
        {
            text: 'npm 相关',
            // collapsed: false, // 默认折叠展开
            items: [
              { text: 'nvm', link: '/core/nvm' },
              { text: 'npm workspace', link: '/core/npm-workspace' },
            ],
        },
        {
            text: 'Eslint 相关',
            items: [
                { text: 'Eslint', link: '/core/eslint' },
                { text: 'husky', link: '/core/husky' },
            ],
        },
    ];
}
