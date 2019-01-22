import React from 'react'
import { Icon, Menu, Row } from 'antd'
import { formateDate } from '@/common/utils/functions'
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

    render() {
        const { collapsed, weatherInfo } = this.props;
        return (
            <Row className="layout-header">
                <Icon className="trigger" type={ collapsed ? 'menu-unfold' : 'menu-fold' } onClick={ this.toggle } />
                <Menu mode="horizontal" className="layout-header-menu">
                    <SubMenu title={<span><Icon type="user" />admins</span>}>
                        <Menu.Item key="modifySelf"><Icon type="skin" />个人修改</Menu.Item>
                        <Menu.Item key="systemSetting"><Icon type="setting" />系统设置</Menu.Item>
                        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
                { weatherInfo && this.renderWeather(weatherInfo) }
            </Row>
        )
    }
}

export default Header
