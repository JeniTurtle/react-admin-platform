import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Breadcrumb } from 'antd'
import { fromJS } from 'immutable';
import { getHashPath } from '@/common/utils/functions'
import menuConfig, { getMenuIndexList } from '@/config/menuConfig'
import './Bcurmb.scss'

class Bcrumb extends React.Component {

    renderBreadcrumb = (menus, menuIndexList) => {
        return menuIndexList.map((item) => {
            const { icon, title, key } =  menus[item];
            menus = menus[item].children;
            return (
                <Breadcrumb.Item key={ key }>
                    <Icon type={icon ? icon : 'laptop'} /><span>{ title }</span>
                </Breadcrumb.Item>
            )
        })
    };

    render() {
        let menus = fromJS(menuConfig).toJS();
        const currentMenu = getHashPath(menus[0].key);
        const menuIndexList = getMenuIndexList(menuConfig, currentMenu);
        return (
            <Breadcrumb className="bread-crumb">
                <Breadcrumb.Item>
                    <Link to={ menus[0].key }><Icon type='home'  /><span>{ this.props.title || '主页' }</span></Link>
                </Breadcrumb.Item>
                { this.renderBreadcrumb(menus, menuIndexList) }
            </Breadcrumb>
        )
    }
};

export default Bcrumb;
