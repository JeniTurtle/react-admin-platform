import React  from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Spin, Form, Input, Button, Icon, Checkbox } from 'antd';
import { checkUsernameFormat } from '@/common/utils/functions'
import authActions  from '@/redux/models/auth'
import './Login.scss'
import loginImg from '@/assets/images/common/logo.svg'

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => { // 登录
    e.preventDefault();
    const {confirmSubmit, form} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        confirmSubmit({ ...values });
      }
    });
  };

  // 验证用户名
  checkUsername = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!checkUsernameFormat(value)) {
      callback("用户名必须为字母、数字、下划线、减号");
    } else {
      callback();
    }
  };

  render() {
    const { isLogined, form, loading } = this.props;
    const getFieldDecorator = form.getFieldDecorator;

    return (
        <div className="login-container">
          { !!isLogined && <Redirect to={{ pathname: "/example/laptop" }} /> }

          <div className="login-form">
            <Spin spinning={loading}>
              <div className="login-logo">
                <img src={ loginImg } />
                <span>React后台管理系统</span>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem hasFeedback>
                  {getFieldDecorator('username', { initialValue: '', rules: [{ required: true, message: "用户名不能为空" }, { validator: this.checkUsername }] })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="用户名" maxLength="16" />
                  )}
                </FormItem>
                <FormItem hasFeedback className="password-input">
                  {getFieldDecorator('password', { rules: [{ required: true, message: "密码不能为空" }] })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" type="password" placeholder="密码" maxLength="20" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                      <Checkbox>记住密码</Checkbox>
                  )}
                  <Button type="primary" htmlType="submit" size="large" loading={ loading }>{ loading ? '登录中...' : '登录' }</Button>
                </FormItem>
              </Form>
            </Spin>
          </div>
        </div>
    );
  }
}

const LoginForm = Form.create()(Login);

const mapStateToProps = (state, ownProps) => {
  let { global, auth } = state;
  return {
    loading: global.loading,
    isLogined: auth.isLogined
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  confirmSubmit: (input) => dispatch(authActions.login(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
