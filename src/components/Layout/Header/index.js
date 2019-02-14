import React from 'react'
import { Icon, Menu, Row } from 'antd'
import { NavLink } from 'react-router-dom'
import { formateDate } from '@/common/utils/functions'
import { rootMenus } from '@/config/menus'
import './Header.scss'

const SubMenu = Menu.SubMenu;

class Header extends React.Component {
    state = {
        sysTime: ''
    };

    componentWillMount() {
        let sysTime = formateDate('yyyy年MM月dd日', new Date());
        this.setState({
            sysTime
        })
    }

    toggle = () => {
        this.props.toggle(!this.props.collapsed);
    };

    userMenusClick = ({ key }) => {
        const { logout } = this.props;

        switch(key) {
            case 'logout':
                logout()
                break;
        }
    };

    renderWeather = (weatherInfo) => {
        return (
            <div className="weather">
                <span className="date">{ this.state.sysTime }</span>
                <span className="weather-img">
                    <img src={ weatherInfo.dayPictureUrl } alt="" />
                </span>
                <span className="weather-detail">
                    { weatherInfo.weather }
                </span>
            </div>
        )
    };

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu
                        title={ item.title }
                        key={ item.rootKey || item.key }
                    >
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={ item.title } key={ item.rootKey || item.key }>
                    <Icon type={ item.icon } />
                    <NavLink to={ item.key } replace>{ item.title }</NavLink>
                </Menu.Item>
            )
        })
    };

    render() {
        const { collapsed, weatherInfo, menuKey, userInfo } = this.props;
        console.log(userInfo)
        return (
            <Row className="layout-header">
                <Icon className="trigger" type={ collapsed ? 'menu-unfold' : 'menu-fold' } onClick={ this.toggle } />
                <Menu mode="horizontal" className="layout-header-menu" selectedKeys={ [menuKey || "home"] }>
                    { this.renderMenu(rootMenus) }
                </Menu>
                <Menu mode="horizontal" onClick={ this.userMenusClick } className="layout-header-user">
                    <SubMenu title={<span><Icon type="user" />{ userInfo.realName || userInfo.username }</span>}>
                        <Menu.Item key="modifySelf"><Icon type="skin" />个人修改</Menu.Item>
                        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
                { weatherInfo && this.renderWeather(weatherInfo) }
            </Row>
        )
    }
}

export default Header
