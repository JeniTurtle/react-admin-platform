import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Modal, message } from 'antd'
import userActions from '@/redux/models/user'
import './UserInfo.scss'

const FormItem = Form.Item;

class UpdatePassword extends React.Component {
    static defaultProps = {
        visiable: false,
        cancel: () => {},
        success: () => {},
    };

    state = {
        password: null,
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (value !== this.state.password) {
            callback("两次密码输入不一致");
        } else {
            callback();
        }
    };

    submitPassword = (e) => {
        const { form, resetUserPassword, userId, success } = this.props;
        e.preventDefault();

        form.validateFields((err, value) => {
            if (!err) {
                resetUserPassword({
                    input: {
                        id: userId,
                        password: value.password,
                    },
                    callback: (resp) => {
                        message.success("密码重置成功");
                        success && success(resp);
                    }
                });
            }
        });
    };

    render() {
        const { visiable, form, loading, cancel } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div className="add-user-modal">
                <Modal
                    title="重置用户密码"
                    wrapClassName="vertical-center-modal"
                    visible={ visiable }
                    confirmLoading={ loading }
                    onOk={ this.submitPassword }
                    onCancel={ cancel }
                    okText="提交"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem
                            { ...formItemLayout }
                            label="新密码"
                            className="password-form-item"
                            hasFeedback={ true }
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入新密码',
                                }, {
                                    min: 6, message: '密码不能少于6位',
                                }],
                            })(
                                <Input onChange={ (e) => this.setState({ password: e.target.value }) }  name="password" type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            { ...formItemLayout }
                            label="重复密码"
                            className="password-form-item"
                            hasFeedback={ true }
                        >
                            {getFieldDecorator('repeatPassword', {
                                rules: [{
                                    required: true, message: '请输入新密码',
                                }, {
                                    validator: this.checkPassword
                                }],
                            })(
                                <Input name="repeatPassword" type="password" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const UpdatePasswordForm = Form.create()(UpdatePassword);

const mapStateToProps = (state) => {
    let { global } = state;
    return {
        loading: global.loading,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    resetUserPassword: (params) => dispatch(userActions.resetUserPassword(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordForm)
