import React from 'react'
import { Card, Button, Modal, message, notification } from 'antd'
import './UI.scss'

class Modals extends React.Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    };

    showMessage = (type)=>{
        message[type]("恭喜你，React课程晋级成功");
    };

    handleOpen = (type)=>{
        this.setState({
            [type]:true
        })
    };

    handleConfirm = (type)=>{
        Modal[type]({
            title:'确认？',
            content:'你确定你会用弹窗了吗？',
            onOk(){
                console.log('Ok')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    };

    openNotification = (type,direction)=>{
        if (direction){
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message:'发工资了',
            description:'上个月考勤22天，迟到12天，实发工资250，请笑纳'
        });
    };

    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() =>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success','topLeft')}>左上Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info','topRight')}>右上Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning','bottomLeft')}>左下Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error','bottomRight')}>右下Error</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1:false
                        })
                    }}
                >
                    <p>这是一个测试弹窗</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>这是一个测试弹窗</p>
                </Modal>
                <Modal
                    title="React"
                    style={{top:20}}
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}
                >
                    <p>这是一个测试弹窗</p>
                </Modal>
                <Modal
                    title="React"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}
                >
                    <p>这是一个测试弹窗</p>
                </Modal>
            </div>
        );
    }
}

export default Modals
