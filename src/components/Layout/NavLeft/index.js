import React from 'react'
import { Menu, Icon, Layout } from 'antd';
import { NavLink } from 'react-router-dom'
import { getHashPath, getMenuIndexList } from '@/common/utils/functions'
import './NavLeft.scss'
import loginImg from '@/assets/images/common/logo.svg'

const { Sider } = Layout;
const { SubMenu } = Menu;

class NavLeft extends React.Component {

    constructor(props) {
        super(props);
    }

    toggle = () => {
        this.props.toggle(!this.props.collapsed);
    };

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu
                        title={
                            <span>
                                { item.icon && <Icon type={ item.icon } /> }
                                <span className="nav-text">{ item.title }</span>
                            </span>
                        }
                        key={ item.key }
                    >
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key} replace>
                        <span>
                            { item.icon && <Icon type={ item.icon } /> }
                            <span className="nav-text">{ item.title }</span>
                        </span>
                    </NavLink>
                </Menu.Item>
            )
        })
    };

    render() {
        const { collapsed, mode, menuConfig } = this.props;
        const defaultSelectedKey = getHashPath(menuConfig[0].key);
        const menuIndexList = getMenuIndexList(menuConfig, defaultSelectedKey);
        const defaultOpenKey = menuIndexList && menuIndexList.length > 0
            ? menuConfig[menuIndexList[0]].key
            : null;

        return (
            <Sider className="layout-sider" collapsible collapsed={ collapsed } onCollapse={ this.toggle }>
                <NavLink to="/home" replace>
                    <div className="nav-logo">
                        <img src={ loginImg } alt=""/>
                        <h1 className="logo-text">React后台管理系统</h1>
                    </div>
                </NavLink>
                <Menu
                    mode={ mode }
                    theme="dark"
                    defaultOpenKeys={ [defaultOpenKey] }
                    defaultSelectedKeys={ [defaultSelectedKey] }
                >
                    { this.renderMenu(menuConfig) }
                </Menu>
            </Sider>
        );
    }
}
export default NavLeft