export default {
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
            { text: 'Guild', link: '/guild/', activeMatch: '^/guild/' },
            { text: 'Library', link: '/library/', activeMatch: '^/library/' },
            {
                text: 'Drop Menu',
                items: [
                    { text: 'Item 1', link: '/guild/drop-menu/item-1' },
                    { text: 'Item 2', link: '/guild/drop-menu/item-2' },
                    {
                        items: [
                            { text: "Item 11", link: "/guild/drop-menu/item-1" },
                        ],
                    },
                    {
                        items: [
                            { text: "Item 22", link: "/guild/drop-menu/item-2" },
                        ],
                    },
                ],
            },
        ],
        // 侧边栏，包含 key 路径的才会出现侧边栏
        sidebar: {
            '/guild/': getGuildSidebar(),
            '/library/': getLibrarySidebar(),
        },
    },
}

function getGuildSidebar() {
    return [
        {
            text: 'Guild A',
            items: [
              { text: 'Index', link: '/guild/' },
              { text: 'Guild 1', link: '/guild/guild-1' },
              { text: 'Guild 2', link: '/guild/guild-2' },
            ],
        },
        {
            text: 'Guild B',
            items: [
              { text: 'Index', link: '/guild/' },
              { text: 'Guild 1', link: '/guild/guild-1' },
              { text: 'Guild 2', link: '/guild/guild-2' },
            ],
        },
    ];
}

function getLibrarySidebar() {
    return [
        {
            text: 'Library A',
            collapsible: true, // 开启折叠
            collapsed: true, // 默认展开
            items: [
              { text: 'Index', link: '/library/' },
              { text: 'Library 1', link: '/library/library-1' },
              { text: 'Library 2', link: '/library/library-2' },
            ],
        },
        {
            text: 'Library B',
            items: [
              { text: 'Index', link: '/library/' },
              { text: 'Library 1', link: '/library/library-1' },
              { text: 'Library 2', link: '/library/library-2' },
            ],
        },
    ];
}
