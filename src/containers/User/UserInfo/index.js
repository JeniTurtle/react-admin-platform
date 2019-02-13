import React from 'react'
import { connect } from 'react-redux';
import { Card, Avatar, Icon, Row, Col, Radio, Button, Checkbox } from 'antd'
import { getRandomColor, deepGet } from '@/common/utils/functions'
import './UserInfo.scss'

class UserInfo extends React.Component {
    existInGroup = (id) => {
        const groupList = deepGet(this.props.userInfo, 'groups.edges');

        if (!groupList) {
            return false
        }
        for (let index in groupList) {
            let node = groupList[index].node;

            if (node.id === id) {
                return true
            }
        }
        return false;
    };

    render() {
        const { show, close, loading, userInfo, selfInfo, groupList, departmentList }  = this.props;
        const avatarColor = getRandomColor();

        return <Card loading={ loading } className={ `user-info-box ${ !show && 'user-info-box-hide' }` } title={
            <div className="user-info-title">
                <Avatar size="small" style={{ marginRight: 8, backgroundColor: avatarColor }}>
                    { userInfo.realName ? userInfo.realName.substr(0, 1).toUpperCase() : (userInfo.username ? userInfo.username.substr(0, 1).toUpperCase() : '') }
                </Avatar>
                <span>用户详情</span>
            </div>
        } extra={
            <Icon type="close" onClick={ close } style={{ fontSize: 16, cursor: 'pointer' }} />
        }>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    用户名：
                </Col>
                <Col className="item-right" span={16}>
                    { userInfo.username }
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    真实姓名：
                </Col>
                <Col className="item-right" span={16}>
                    { userInfo.realName || '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    性别：
                </Col>
                <Col className="item-right" span={16}>
                    { {'A_0': '未知', 'A_1': '男', 'A_2': '女'}[userInfo.gender] }
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    电话号码：
                </Col>
                <Col className="item-right" span={16}>
                    { userInfo.mobile || '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    电子邮箱：
                </Col>
                <Col className="item-right" span={16}>
                    { userInfo.email || '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    所属部门：
                </Col>
                <Col className="item-right" span={16}>
                    { userInfo.department ? userInfo.department.departmentName : '暂无' }
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    状态：
                </Col>
                <Col className="item-right" span={16}>
                    <Radio.Group disabled={ !selfInfo.isSuperuser } name="isActive" value={ userInfo.isActive ? 1 : 0 }>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>停用</Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    设置：
                </Col>
                <Col className="item-right" span={16}>
                    <Button disabled={ !selfInfo.isSuperuser }>重置密码</Button>
                </Col>
            </Row>
            <Row className="item-row" gutter={26}>
                <Col className="item-left" span={8}>
                    角色：
                </Col>
                <Col className="item-right" span={16}>
                    <Row>
                        <Checkbox disabled={ true } checked={ userInfo.isSuperuser } value="0">超级管理员</Checkbox>
                    </Row>
                    {
                        groupList.map((item) => {
                            return <Row key={ item.id }>
                                <Checkbox disabled={ !selfInfo.isSuperuser } defaultChecked={ this.existInGroup(item.id) } value={ item.id }>{ item.name }</Checkbox>
                            </Row>
                        })
                    }
                </Col>
            </Row>
        </Card>
    }
}

const mapStateToProps = (state) => {
    let { auth, user } = state;
    return {
        selfInfo: auth.userInfo,
        groupList: user.groupList,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
