import React from 'react'
import { Card, Row, Col, Modal } from 'antd'
import img1 from '@/assets/images/example/gallery/1.png'
import img2 from '@/assets/images/example/gallery/2.png'
import img3 from '@/assets/images/example/gallery/3.png'
import img4 from '@/assets/images/example/gallery/4.png'
import img5 from '@/assets/images/example/gallery/5.png'
import img6 from '@/assets/images/example/gallery/6.png'
import img7 from '@/assets/images/example/gallery/7.png'
import img8 from '@/assets/images/example/gallery/8.png'
import img9 from '@/assets/images/example/gallery/9.png'
import img10 from '@/assets/images/example/gallery/10.png'
import img11 from '@/assets/images/example/gallery/11.png'
import img12 from '@/assets/images/example/gallery/12.png'


class Gallery extends React.Component{

    state={
        visible:false
    };

    openGallery = (imgSrc)=>{
        this.setState({
            visible:true,
            currentImg: imgSrc
        })
    };

    render(){
        let key = 0;
        const imgs = [
            [img1, img2, img3], [img4, img5, img6],
            [img7, img8, img9], [img10, img11, img12]
        ];
        const imgList = imgs.map((list) => list.map((item) =>
            <Card
                key={ key += 1 }
                style={{marginBottom:10, cursor: 'pointer'}}
                onClick={()=>this.openGallery(item)}
            >
                <div className="custom-image">
                    <img alt="example" width="100%" src={ item } />
                </div>
                <div className="custom-card">
                    <h3>React Admin</h3>
                    <p>I Love React</p>
                </div>
            </Card>
        ));

        return (
            <div className="card-wrap">
                <Row gutter={5}>
                    <Col md={6}>
                        {imgList[0]}
                    </Col>
                    <Col md={6}>
                        {imgList[1]}
                    </Col>
                    <Col md={6}>
                        {imgList[2]}
                    </Col>
                    <Col md={6}>
                        {imgList[3]}
                    </Col>
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                >
                    {<img src={this.state.currentImg} alt="" style={{width:'100%'}}/>}
                </Modal>
            </div>
        );
    }
}

export default Gallery
