import React from 'react'
import { connect } from 'react-redux';
import { Card, Avatar, Icon, Row, Col, Radio, Button, Select, Cascader, message } from 'antd'
import { getRandomColor, deepGet, getMenuIndexList } from '@/common/utils/functions'
import userActions from '@/redux/models/user'
import { buildTree } from '@/redux/models/department'
import UpdatePassword from './UpdatePassword'
import './UserInfo.scss'

const Option = Select.Option;

class UserInfo extends React.Component {
    state = {
        isActive: null,
        groups: null,
        department: null,
        isShowUpdatePassword: false,
        currentUserId: null,
    };

    setStatus = (e) => {
        this.setState({
            isActive: e.target.value,
        });
    };

    onGroupsChange = values => {
        this.setState({
            groups: values
        })
    };

    onDepartmentChange = (value) => {
        this.setState({
            department: value
        })
    };

    validateSubmitParams = () => {
        const { isActive, groups, department } = this.state;
        return isActive !== null || groups !== null || department !== null;
    };

    submitUserInfo = () => {
        const { isActive, groups, department } = this.state;
        const id = this.props.userInfo.id;

        if (!this.validateSubmitParams() || !id) {
            return false;
        }
        const data = { id };
        if (isActive !== null) data.isActive = isActive;
        if (groups !== null) data.groups = groups;
        if (department !== null && department.length > 0) data.department = department[department.length - 1];

        this.props.updateUserInfo({
            input: { ...data },
            callback: (resp) => {
                console.log('用户修改成功: ', resp);
                message.success('修改成功');
                this.props.success();
            }
        })
    };

    render() {
        const { show, close, loading, userInfo, selfInfo, groupList, departmentList }  = this.props;
        const { isActive, groups, department, isShowUpdatePassword, currentUserId } = this.state;
        const avatarColor = getRandomColor();
        // Cascader组件有个bug, 会修改传入的数据对象, 所以下面每次都深拷贝一个新的对象
        const departments = buildTree(eval(JSON.stringify(departmentList)));

        const closeModal = () => {
            close();
            this.setState({ groups: null, isActive: null, department: null })
        };

        const defaultGroups = () => {
            const groups = deepGet(userInfo, 'groups.edges', []);
            return groups.map(group => group.node.id)
        };

        const defaultDepartment = (list, userInfo) => {
            if (!list) {
                return [];
            }
            list = eval(JSON.stringify(list));

            const indexList = getMenuIndexList(list, deepGet(userInfo, 'department.id'));
            if (!indexList) {
                return []
            }
            return indexList.map((item) => {
                const { key } =  list[item];
                list = list[item].children;
                return key
            })
        };

        return <Card loading={ loading } className={ `user-info-box ${ !show && 'user-info-box-hide' }` } title={
            <div className="user-info-title">
                <Avatar size="small" style={{ marginRight: 8, backgroundColor: avatarColor }}>
                    { userInfo.realName ? userInfo.realName.substr(0, 1).toUpperCase() : (userInfo.username ? userInfo.username.substr(0, 1).toUpperCase() : '') }
                </Avatar>
                <span>用户详情</span>
            </div>
        } extra={
            <Icon type="close" onClick={ closeModal } style={{ fontSize: 16, cursor: 'pointer' }} />
        }>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    用户名：
                </Col>
                <Col className="item-right" span={17}>
                    { userInfo.username }
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    真实姓名：
                </Col>
                <Col className="item-right" span={17}>
                    { userInfo.realName || '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    性别：
                </Col>
                <Col className="item-right" span={17}>
                    { {'A_0': '未知', 'A_1': '男', 'A_2': '女'}[userInfo.gender] }
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    电话号码：
                </Col>
                <Col className="item-right" span={17}>
                    { userInfo.mobile || '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    电子邮箱：
                </Col>
                <Col className="item-right" span={17}>
                    { userInfo.email || '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    所属部门：
                </Col>
                <Col className="item-right" span={17}>
                    {/*{ userInfo.department ? userInfo.department.departmentName : '暂无' }*/}
                    <Cascader
                        disabled={ !selfInfo.isSuperuser }
                        options={ departments }
                        placeholder="请选择部门"
                        style={{ width: '100%' }}
                        onChange={ this.onDepartmentChange }
                        value={ department || defaultDepartment(departments, userInfo) }
                        changeOnSelect
                    />
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    状态：
                </Col>
                <Col className="item-right" span={17}>
                    <Radio.Group
                        disabled={ !selfInfo.isSuperuser }
                        onChange={ this.setStatus }
                        name="isActive"
                        value={ isActive === null ? userInfo.isActive ? 1 : 0 : isActive }
                    >
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>停用</Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    设置：
                </Col>
                <Col className="item-right" span={17}>
                    <Button
                        disabled={ !selfInfo.isSuperuser }
                        onClick={ () => { this.setState({ isShowUpdatePassword: true, currentUserId: userInfo.id }) } }
                    >
                        重置密码
                    </Button>
                </Col>
            </Row>
            <Row className="item-row" gutter={18}>
                <Col className="item-left" span={7}>
                    选择角色：
                </Col>
                <Col className="item-right" span={17}>
                    <Select
                        mode="multiple"
                        disabled={ !selfInfo.isSuperuser }
                        style={{ width: '100%' }}
                        placeholder="选择角色"
                        value={ groups || defaultGroups() }
                        onChange={ this.onGroupsChange }
                    >
                        {  groupList.map(group => <Option key={ group.id } value={ group.id }>{ group.name }</Option>) }
                    </Select>
                </Col>
            </Row>

            <Row className="item-row button-row" style={{ display: selfInfo.isSuperuser ? "block" : "none" }}>
                <Button loading={ loading } disabled={ !this.validateSubmitParams() } type="primary" onClick={ this.submitUserInfo }>修改</Button>
                <Button style={{ marginLeft: 40 }} onClick={ closeModal }>取消</Button>
            </Row>

            <UpdatePassword
                userId={ currentUserId }
                visiable={ isShowUpdatePassword }
                cancel={ () => this.setState({ isShowUpdatePassword: false }) }
                success={ () => this.setState({ isShowUpdatePassword: false }) }
            />
        </Card>
    }
}

const mapStateToProps = (state) => {
    let { auth, user, department, global } = state;
    return {
        loading: global.loading,
        selfInfo: auth.userInfo,
        groupList: user.groupList,
        departmentList: department.departmentList.edges,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateUserInfo: (params) => dispatch(userActions.updateUserInfo(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
