const menuList = [
    {
        title: '设置帮助',
        icon: 'api',
        key: '/setting/help'
    },
    {
        title: '用户设置',
        icon: 'user',
        key: '/setting/user',
        children: [
            {
                title: '用户管理',
                icon: 'contacts',
                key: '/setting/user/users',
            },
            {
                title: '部门管理',
                icon: 'team',
                key: '/setting/user/departments',
            },
        ]
    },
    {
        title: '河流设置',
        icon: 'database',
        key: '/setting/river',
        children: [
            {
                title: '河流管理',
                icon: 'bars',
                key: '/setting/river/rivers',
            },
            {
                title: '河段管理',
                icon: 'filter',
                key: '/setting/river/reach',
            },
            {
                title: '水文站管理',
                icon: 'environment-o',
                key: '/setting/river/monitor',
            },
            {
                title: '建册断面管理',
                icon: 'switcher',
                key: '/setting/river/section'
            },
        ]
    },
];

export default {
    menus: menuList,
    key: 'SETTING'
}
