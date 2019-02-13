import React from 'react'
import { Card, Carousel } from 'antd'
import './UI.scss'
import img1 from '@/assets/images/example/carousel/carousel-1.jpg'
import img2 from '@/assets/images/example/carousel/carousel-2.jpg'
import img3 from '@/assets/images/example/carousel/carousel-3.jpg'

class Carousels extends React.Component{

    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-wrap">
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src={ img1 } alt=""/>
                        </div>
                        <div>
                            <img src={ img2 } alt="" />
                        </div>
                        <div>
                            <img src={ img3 } alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}

export default Carousels
