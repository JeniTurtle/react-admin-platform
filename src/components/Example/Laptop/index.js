import React from 'react';
import { Row, Col, Card, Steps, Button, message } from 'antd';
import './Laptop.scss'

const Step = Steps.Step;

class Laptop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const steps = [{
            title: '下载',
            content: '<p>$&nbsp;&nbsp;&nbsp;git clone</p><p>$&nbsp;&nbsp;&nbsp;git clone https://github.com/tomorrowCat/react-admin.git</p><p>$&nbsp;&nbsp;&nbsp;cd react-admin</p>',
        }, {
            title: '安装',
            content: '<p>// 安装前请先确保已安装node和npm</p><p>// 安装成功后,再安装依赖，如果之前有用npm安装过，请先删掉node_modules</p><p>$&nbsp;&nbsp;&nbsp;yarn install</p>',
        }, {
            title: '运行',
            content: '<p>$&nbsp;&nbsp;&nbsp;yarn run dev （开发环境编译模式，支持热加载和reduxDevTools）</p><p>$&nbsp;&nbsp;&nbsp;yarn run build （发布生产版本，对代码进行混淆压缩，提取公共代码，按需加载等）</p>',
        }];
        const { current } = this.state;
        return (
            <div className="laptop-container">
                <Row>
                    <Col span={24}>
                        <Card title="项目上手" className="study-card">
                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>
                            <div className="steps-content" dangerouslySetInnerHTML={{__html: steps[this.state.current].content}}></div>
                            <div className="steps-action">
                                {
                                    this.state.current < steps.length - 1
                                    &&
                                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <Button type="primary" onClick={() => message.success('恭喜您，大牛!')}>完成</Button>
                                }
                                {
                                    this.state.current > 0
                                    &&
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                        上一步
                                    </Button>
                                }
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Laptop