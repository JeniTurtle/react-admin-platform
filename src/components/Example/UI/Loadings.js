import React from 'react'
import { Card, Spin, Icon, Alert } from  'antd'
import Bcrumb from '@/components/Bcrumb'
import './UI.scss'

class Loadings extends React.Component{
    render() {
        const icon = <Icon  type="loading" style={{fontSize:24}}/>
        return (
            <div>
                <Bcrumb />
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="这是一个测试案例"
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="这是一个测试案例"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="这是一个测试案例"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}

export default Loadings

