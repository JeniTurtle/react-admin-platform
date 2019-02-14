import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { is, fromJS } from 'immutable';
import { localItem, removeLocalItem } from '@/common/storage/localStorage'
import { getCookieToken } from '@/common/cookie/authToken'
import thridActions from '@/redux/models/thirdPartyApi'
import authActions from '@/redux/models/auth'
import NavLeft from '@/components/Layout/NavLeft'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import Bcrumb from '@/components/Bcrumb'
import './Admin.scss'

const STORAGE_COLLAPSED = 'COLLAPSED';
const { Content } = Layout;

@withRouter
class Admin extends React.Component {
    constructor(props) {
        super(props);
        const collapsed = localItem(STORAGE_COLLAPSED) == 'YES';
        this.state = {
            collapsed: false,
            mode: collapsed ? 'vertical' : 'inline',
        };
        this.checkAuthTime = 0;
    }

    toggle = (collapsed) => {
        localItem(STORAGE_COLLAPSED, collapsed ? 'YES' : 'NO');
        this.setState({
            collapsed: collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        });
    };

    checkAuth = () => {
        const currentTime = Date.parse(new Date());
        // 刷新token接口节流, 操作超过2分钟更新一次token, token有效期为后端设置, 目前是15分钟
        if (currentTime - this.checkAuthTime > 2 * 60 * 1000) {
            this.checkAuthTime = currentTime;
            const { checkAuth=true, clearAuth, refreshToken } = this.props;
            const token = getCookieToken();
            checkAuth && (token ? refreshToken(token) : clearAuth());
        }
    };

    componentWillMount() {
        this.props.getWeather();
        this.checkAuth();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    componentWillUpdate() {
        this.checkAuth();
    }

    render() {
        const { mode, collapsed } = this.state;
        const { weatherInfo, menuConfig, rootBcrumb, isLogined, redirectLogin, clearAuth, selfInfo } = this.props;
        return (
            <Layout className={ collapsed ? 'layout-container-collapsed' : 'layout-container' }>
                { !isLogined && redirectLogin }
                <NavLeft
                    mode={ mode }
                    collapsed={ collapsed }
                    menuConfig={ menuConfig.menus }
                    toggle={ collapsed => this.toggle(collapsed) }
                />
                <Layout className="layout-right">
                    <Header
                        collapsed={ collapsed }
                        menuKey={ menuConfig.key }
                        toggle={ collapsed => this.toggle(collapsed) }
                        weatherInfo={ weatherInfo }
                        logout={ clearAuth }
                        userInfo={ selfInfo }
                    />
                    <Content className="layout-content">
                        <Bcrumb menuConfig={ menuConfig.menus } rootBcrumb={ rootBcrumb } />
                        { this.props.children }
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { thirdParty, auth } = state;
    return {
        isLogined: auth.isLogined,
        selfInfo: auth.userInfo,
        redirectLogin: auth.redirectLogin,
        weatherInfo: thirdParty.weatherInfo,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getWeather: () => dispatch(thridActions.getWeather()),
    refreshToken: (token) => dispatch(authActions.refreshToken(token)),
    clearAuth: () => dispatch(authActions.clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin)