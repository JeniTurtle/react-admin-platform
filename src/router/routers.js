import React from 'react'
import Loadable from 'react-loadable';
import PageLoading from "../components/Loading/PageLoading"

/**
 * 根据路由按需加载
 * @param Component
 */
const generateRouter = (Component) => {
    return Loadable({
        loader: () => Component,
        loading: PageLoading
    })
};

export default {
    generateRouter,
    Login: generateRouter(import('../containers/Login')),
    Setting: {
        Help:  generateRouter(import('../components/Setting/Help')),
        UserList: generateRouter(import('../containers/User/UserList')),
    },
    Example: {
        Laptop: generateRouter(import('../components/Example/Laptop')),
        UI: {
            Buttons: generateRouter(import('../components/Example/UI/Buttons')),
            Modals: generateRouter(import('../components/Example/UI/Modals')),
            Loadings: generateRouter(import('../components/Example/UI/Loadings')),
            Tabs: generateRouter(import('../components/Example/UI/Tabs')),
            Carousel: generateRouter(import('../components/Example/UI/Carousel')),
        },
        Form: {
            Login: generateRouter(import('../components/Example/Form/Login')),
            Register: generateRouter(import('../components/Example/Form/Register')),
            RichText: generateRouter(import('../components/Example/Form/RichText')),
        },
        Table: {
            BasicTable: generateRouter(import('../components/Example/Table/BasicTable')),
            HighTable: generateRouter(import('../components/Example/Table/HighTable')),
        },
        Charts: {
            Bar: generateRouter(import('../components/Example/ECharts/Bar')),
            Pie: generateRouter(import('../components/Example/ECharts/Pie')),
            Line: generateRouter(import('../components/Example/ECharts/Line')),
        },
        Map: generateRouter(import('../components/Example/Map')),
        Gallery: generateRouter(import('../components/Example/Gallery')),
    },
}