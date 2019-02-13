import React from 'react'
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import { Table, Button, Card, Row, Col, Select, Input, Badge, Icon, message } from 'antd';
import './UserList.scss'
import UserInfo from '../UserInfo'
import AddUser from '../AddUser'
import userActions from '@/redux/models/user'
import departmentActions from '@/redux/models/department'
import { formateDate, deepGet } from '@/common/utils/functions'
import TablePagination from '@/components/Pagination/TablePagination'

const Option = Select.Option;
const Search = Input.Search;

class UserList extends React.Component {
    pageItemNum = 15;
    gender = null;
    orderColumn = '-create_time';
    isActive = null;

    defaultPageInfo = {
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
    };

    defaultState = {
        username: null,
        usernameFilterVisible: false,
        realName: null,
        realNameFilterVisible: false,
        mobile: null,
        mobileFilterVisible: false,
        email: null,
        emailFilterVisible: false,
        isShowUserInfo: false,
        isShowAddUser: false,
    };

    constructor(props) {
        super(props);
        this.state = { ...this.defaultState }
    }

    componentWillMount() {
        this.refresh()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    refresh = () => {
        const { pageItemNum, orderColumn, defaultState } = this;
        this.setState({ ...defaultState }) ;
        this.props.getUserList({
            first: pageItemNum,
            order: orderColumn, // 创建时间倒序
        })
    };

    showUserInfo = (userInfo) => {
        return () => {
            if (!userInfo.id) {
                return message.error("无效的用户ID")
            }
            this.props.getUserInfoAndGroups({ id: userInfo.id });
            this.setState({
                isShowUserInfo: true,
            })
        }
    };

    generateTableData = () => {
        const data = [];
        const { userList } = this.props;

        if (!userList || !userList.edges) {
            return data;
        }

        for (let i = 0; i < userList.edges.length; i++) {
            let item = userList.edges[i].node;
            data.push({
                key: i,
                username: item.username,
                realName: item.realName || '暂无',
                gender: item.gender,
                mobile: item.mobile || '暂无',
                email: item.email || '暂无',
                department: item.department ? item.department.departmentName : '暂无',
                isActive: item.isActive,
                createTime: formateDate('yyyy-MM-dd hh:mm:ss', new Date(item.createTime.replace('T', " ").replace(/\-/g, '/').split('.')[0])),
                operation: <Button type="primary" size="small" ghost onClick={ this.showUserInfo(item) }>查看</Button>,
            });
        }
        return data;
    };

    pageChangedHandle = (options) => {
        const params = Object.assign({
            order: this.orderColumn,
            gender: this.gender,
            isActive: this.isActive,
            username: this.state.username,
            realName: this.state.realName,
            mobile: this.state.mobile,
            email: this.state.email,
        }, options);
        this.props.getUserList(params);
    };

    selectHandleChange = (value) => {
        const params = {
            first: this.pageItemNum,
            order: this.orderColumn,
            gender: this.gender,
            username: this.state.username,
            realName: this.state.realName,
            isActive: eval(value.key),
            mobile: this.state.mobile,
            email: this.state.email,
        };
        this.props.getUserList(params);
    };

    tableChange = (pagination, filters, sorter) => {
        this.orderColumn = sorter.order === 'descend' ? 'create_time' : '-create_time';
        const params = {
            first: this.pageItemNum,
            order: this.orderColumn,
            gender: this.gender,
            isActive: this.isActive,
            username: this.state.username,
            realName: this.state.realName,
            mobile: this.state.mobile,
            email: this.state.email,
        };
        let gender, isActive;
        if (gender = deepGet(filters, 'gender[0]')) {
            params.gender = this.gender = gender.replace('A_', '')
        }
        if (isActive = deepGet(filters, 'isActive[0]')) {
            params.isActive = this.isActive = eval(isActive); // 字符串转boolean
        }
        this.props.getUserList(params)
    };

    onSearch = () => {
        const params = {
            first: this.pageItemNum,
            order: this.orderColumn,
            gender: this.gender,
            isActive: this.isActive,
            username: this.state.username,
            realName: this.state.realName,
            mobile: this.state.mobile,
            email: this.state.email,
        };
        this.props.getUserList(params);
        this.setState({
            usernameFilterVisible: false,
            realNameFilterVisible: false,
            mobileFilterVisible: false,
            emailFilterVisible: false,
        })
    };

    render() {
        const { loading, userList, userInfo, selfInfo, getDepartmentList } = this.props;
        const { isShowUserInfo, isShowAddUser } = this.state;

        const columns = [{
            title: '用户名',
            dataIndex: 'username',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ ele => this.usernameSearchInput = ele }
                        placeholder="搜索用户名"
                        value={ this.state.username }
                        onChange={ e => this.setState({username: e.target.value}) }
                        onPressEnter={ this.onSearch }
                    />
                    <Button type="primary" onClick={ this.onSearch }>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: !!this.state.username ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.usernameFilterVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    usernameFilterVisible: visible,
                }, () => this.usernameSearchInput.focus());
            },
        }, {
            title: '真实姓名',
            dataIndex: 'realName',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ ele => this.realNameSearchInput = ele }
                        placeholder="搜索真实姓名"
                        value={ this.state.realName }
                        onChange={ e => this.setState({realName: e.target.value}) }
                        onPressEnter={ this.onSearch }
                    />
                    <Button type="primary" onClick={ this.onSearch }>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: !!this.state.realName ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.realNameFilterVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    realNameFilterVisible: visible,
                }, () => this.realNameSearchInput.focus());
            },
        }, {
            title: '性别',
            dataIndex: 'gender',
            filters: [{
                text: '男',
                value: 'A_1',
            }, {
                text: '女',
                value: 'A_2',
            }, {
                text: '未知',
                value: 'A_0',
            }],
            filterMultiple: false,
            onFilter: (value, record) => true,
            render(gender) {
                switch (gender) {
                    case 'A_1':
                        return '男';
                    case 'A_2':
                        return '女';
                    default:
                        return '未知'
                }
            }
        }, {
            title: '手机号码',
            dataIndex: 'mobile',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ ele => this.mobileSearchInput = ele }
                        placeholder="搜索手机号码"
                        value={ this.state.mobile }
                        onChange={ e => this.setState({mobile: e.target.value}) }
                        onPressEnter={ this.onSearch }
                    />
                    <Button type="primary" onClick={ this.onSearch }>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: !!this.state.mobile ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.mobileFilterVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    mobileFilterVisible: visible,
                }, () => this.mobileSearchInput.focus());
            },
        }, {
            title: '电子邮箱',
            dataIndex: 'email',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ ele => this.emailSearchInput = ele }
                        placeholder="搜索电子邮箱"
                        value={ this.state.email }
                        onChange={ e => this.setState({email: e.target.value}) }
                        onPressEnter={ this.onSearch }
                    />
                    <Button type="primary" onClick={ this.onSearch }>搜索</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: !!this.state.email ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.emailFilterVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    emailFilterVisible: visible,
                }, () => this.emailSearchInput.focus());
            },
        }, {
            title: '所属部门',
            dataIndex: 'department',
        }, {
            title: '状态',
            dataIndex: 'isActive',
            filters: [{
                text: '正常',
                value: true,
            }, {
                text: '停用',
                value: false,
            }],
            filterMultiple: false,
            onFilter: (value, record) => true,
            render(status) {
                return status ? <Badge status="success" text="正常"/> : <Badge status="error" text="停用"/>
            }
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            sorter: (a, b) => false,
        }, {
            title: '操作',
            dataIndex: 'operation',
        }];

        return (
            <div className="user-list-box">
                <Card title="用户管理">
                    <div style={{ marginBottom: 16 }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={3}>
                                <Select labelInValue defaultValue={{ key: this.isActive + "" }} onChange={ this.selectHandleChange }>
                                    <Option value="null">全部</Option>
                                    <Option value="true">正常</Option>
                                    <Option value="false">停用</Option>
                                </Select>
                            </Col>
                            <Col className="gutter-row" span={5}>
                                <Search
                                    placeholder="输入用户名搜索"
                                    value={ this.state.username }
                                    onChange={ e => this.setState({username: e.target.value}) }
                                    onSearch={ value => this.onUsernameSearch() }
                                />
                            </Col>
                            <Col span={13}>
                                <Button type="primary" icon="reload" onClick={ this.refresh }>刷新</Button>
                            </Col>
                            <Col className="gutter-row-right-align" span={3}>
                                <Button
                                    type="primary"
                                    onClick={ () => {
                                        getDepartmentList();
                                        this.setState({ isShowAddUser: true });
                                    } }
                                    disabled={ !selfInfo.isSuperuser }>
                                    添加用户<Icon type="plus-circle-o" />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        loading={ loading }
                        pagination={ false }
                        columns={ columns }
                        onChange = { this.tableChange }
                        dataSource={ this.generateTableData() }
                    />
                    <TablePagination
                        pageItemNum={ this.pageItemNum }
                        pageInfo={ userList ? userList.pageInfo : this.defaultPageInfo }
                        pageChangedHandle={ this.pageChangedHandle }
                    />
                </Card>

                <UserInfo
                    show={ isShowUserInfo }
                    loading={ loading }
                    userInfo={ userInfo }
                    close={ () => { this.setState({ isShowUserInfo: false }) } }
                />

                <AddUser
                    visiable={ isShowAddUser }
                    cancel={ () => { this.setState({ isShowAddUser: false }) } }
                    success={ (resp) => {
                        this.setState({ isShowAddUser: false });
                        this.refresh();
                        message.success('用户添加成功');
                    } }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { global, user, auth } = state;
    return {
        loading: global.loading,
        userList: user.userList,
        userInfo: user.userInfo,
        selfInfo: auth.userInfo,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUserList: (input) => dispatch(userActions.getUserList(input)),
    getUserInfoAndGroups: (input) => dispatch(userActions.getUserInfoAndGroups(input)),
    getDepartmentList: () => dispatch(departmentActions.getDepartmentList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
