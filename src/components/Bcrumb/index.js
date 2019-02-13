import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Breadcrumb } from 'antd'
import { fromJS } from 'immutable';
import { getHashPath, getMenuIndexList } from '@/common/utils/functions'
import './Bcrumb.scss'

class Bcrumb extends React.Component {

    renderBreadcrumb = (menus, menuIndexList) => {
        if (!menuIndexList) {
            return
        }
        return menuIndexList.map((item) => {
            const { icon, title, key } =  menus[item];
            menus = menus[item].children;
            return (
                <Breadcrumb.Item key={ key }>
                    <Link to={ key }><Icon type={icon ? icon : 'laptop'} /><span>{ title }</span></Link>
                </Breadcrumb.Item>
            )
        })
    };

    render() {
        const { menuConfig, rootBcrumb } = this.props;
        let menus = fromJS(menuConfig).toJS();
        const currentMenu = getHashPath(menus[0].key);
        const menuIndexList = getMenuIndexList(menuConfig, currentMenu);
        return (
            <Breadcrumb className="bread-crumb">
                <Breadcrumb.Item>
                    <Link to={ rootBcrumb.key }><Icon type={ rootBcrumb.icon }  /><span>{ rootBcrumb.title }</span></Link>
                </Breadcrumb.Item>
                { this.renderBreadcrumb(menus, menuIndexList) }
            </Breadcrumb>
        )
    }
};

export default Bcrumb;
