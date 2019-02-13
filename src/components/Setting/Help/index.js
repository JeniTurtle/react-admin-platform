import React from 'react';
import { Collapse, Card } from 'antd';
import './Help.scss'

const Panel = Collapse.Panel;

const Help = (props) => (
    <div>
        <Card title="设置帮助" className="setting-help">
            <Collapse bordered={false} defaultActiveKey={['1', '2']}>
                <Panel header="一、用户设置" key="1">
                    <h6>1、用户管理</h6>
                    <p>用户管理、用户管理、用户管理、用户管理、用户管理</p>
                    <h6>2、部门管理</h6>
                    <p>部门管理、部门管理、部门管理、部门管理、部门管理</p>
                </Panel>
                <Panel header="二、河流设置" key="2">
                    <h6>1、河流管理</h6>
                    <p>河流管理、河流管理、河流管理、河流管理、河流管理</p>
                    <h6>2、河段管理</h6>
                    <p>河段管理、河段管理、河段管理、河段管理、河段管理</p>
                    <h6>3、水文站管理</h6>
                    <p>水文站管理、水文站管理、水文站管理、水文站管理、水文站管理</p>
                    <h6>4、监测断面管理</h6>
                    <p>监测断面管理、监测断面管理、监测断面管理、监测断面管理、监测断面管理</p>
                </Panel>
            </Collapse>
        </Card>
    </div>
);

export default Help;
