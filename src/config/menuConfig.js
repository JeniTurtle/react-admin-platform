const menuList = [
    {
        title: '快速入门',
        icon: 'laptop',
        key: '/example/laptop'
    },
    {
        title: 'UI元素',
        icon: 'skin',
        key: '/example/ui',
        children: [
            {
                title: '按钮',
                icon: 'right-circle-o',
                key: '/example/ui/buttons',
            },
            {
                title: '弹框',
                icon: 'message',
                key: '/example/ui/modals',
            },
            {
                title: 'Loading',
                icon: 'reload',
                key: '/example/ui/loadings',
            },
            {
                title: 'Tab标签',
                icon: 'tag-o',
                key: '/example/ui/tabs',
            },
            {
                title: '轮播图',
                icon: 'picture',
                key: '/example/ui/carousel',
            }
        ]
    },
    {
        title: '表单',
        icon: 'database',
        key: '/example/form',
        children: [
            {
                title: '登录',
                icon: 'login',
                key: '/example/form/login',
            },
            {
                title: '注册',
                icon: 'plus-square-o',
                key: '/example/form/register',
            },
            {
                title: '富文本',
                icon: 'code-o',
                key: '/example/form/rich'
            },
        ]
    },
    {
        title: '表格',
        icon: 'appstore-o',
        key: '/example/table',
        children: [
            {
                title: '基础表格',
                icon: 'credit-card',
                key: '/example/table/basic',
            },
            {
                title: '高级表格',
                icon: 'layout',
                key: '/example/table/high',
            }
        ]
    },
    {
        title: '图表',
        icon: 'dot-chart',
        key: '/example/charts',
        children: [
            {
                title: '柱形图',
                icon: 'bar-chart',
                key: '/example/charts/bar'
            },
            {
                title: '饼图',
                icon: 'pie-chart',
                key: '/example/charts/pie'
            },
            {
                title: '折线图',
                icon: 'area-chart',
                key: '/example/charts/line'
            },
        ]
    },
    {
        title: '在线地图',
        icon: 'global',
        key: '/example/map'
    },
    {
        title: '图片画廊',
        icon: 'camera-o',
        key: '/example/gallery',
    },
];

/**
 * 查询指定menu的索引列表, 方便遍历出该menu的整个层级
 * @param obj
 * @param value
 * @param tmp
 * @param deep
 * @returns {*}
 */
const getMenuIndexList = (obj, value, tmp=[], deep=0) => {
    for (let index in obj) {
        let item = obj[index];
        if (index > 0) {
            tmp.pop()
        }
        tmp.push(index)

        if (item.key === value) {
            return tmp
        } else if (item.children) {
            let ret = getMenuIndexList(item.children, value, tmp, deep+1)
            if (ret) {
                return ret
            } else if (deep == 0) {
                tmp = []
            } else {
                tmp.pop()
            }
        }
    }
};

export {
    menuList as default,
    getMenuIndexList
}
