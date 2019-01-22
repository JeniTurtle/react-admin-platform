import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { is, fromJS } from 'immutable';
import { localItem, removeLocalItem } from '@/common/storage/localStorage'
import authActions from '@/redux/models/auth'
import thridActions from '@/redux/models/thirdPartyApi'
import NavLeft from '@/components/Layout/NavLeft'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import './Admin.scss'

const STORAGE_COLLAPSED = 'COLLAPSED';
const { Content } = Layout;

@withRouter
class Admin extends React.Component {
    constructor(props) {
        super(props);
        const collapsed = localItem(STORAGE_COLLAPSED) == 'YES';
        this.state = {
            collapsed: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    }

    toggle = (collapsed) => {
        localItem(STORAGE_COLLAPSED, collapsed ? 'YES' : 'NO');
        this.setState({
            collapsed: collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        });
    };

    componentDidMount() {
        this.props.getWeather()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        const { mode, collapsed } = this.state;
        const { weatherInfo } = this.props;
        return (
            <Layout className={ collapsed ? 'layout-container-collapsed' : 'layout-container' }>
                <NavLeft mode={ mode } collapsed={ collapsed } toggle={ collapsed => this.toggle(collapsed) } />
                <Layout className="layout-right">
                    <Header collapsed={ collapsed } toggle={ collapsed => this.toggle(collapsed) } weatherInfo={ weatherInfo } />
                    <Content className="layout-content">
                        {this.props.children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { thirdParty } = state;
    return {
        weatherInfo: thirdParty.weatherInfo,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getWeather: () => dispatch(thridActions.getWeather()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin)