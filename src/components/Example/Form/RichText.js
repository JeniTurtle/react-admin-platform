import React from 'react'
import {Button,Card,Modal} from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Bcrumb from '@/components/Bcrumb'
import draftjs from 'draftjs-to-html'

class RichText extends React.Component{

    state = {
        showRichText:false,
        editorContent: '',
        editorState: '',
    };

    handleClearContent = ()=>{
        this.setState({
            editorContent: '',
            editorState:''
        })
    };

    handleGetText = ()=>{
        this.setState({
            showRichText:true
        })
    };

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    render(){
        const { editorContent, editorState, showRichText } = this.state;
        return (
            <div>
                <Bcrumb />
                <Card>
                    <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器" style={{marginTop:10}}>
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(editorContent)}
                </Modal>
            </div>
        );
    }
}

export default RichText