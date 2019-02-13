import exampleMenus from './example.menus'
import settingMenus from './setting.menus'

const rootMenus = [
    {
        title: '首页',
        icon: 'home',
        key: '/home',
        rootKey: 'ADMIN',
    },
    {
        title: 'UI示例',
        icon: 'skin',
        key: '/example/laptop',
        rootKey: 'EXAMPLE',
    },
    {
        title: '系统设置',
        icon: 'setting',
        key: '/setting/help',
        rootKey: 'SETTING',
    },
];

export {
    rootMenus,
    settingMenus,
    exampleMenus,
}