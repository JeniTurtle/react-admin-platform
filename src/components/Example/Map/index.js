import React from 'react'
import { Card } from 'antd'
import Bcrumb from '@/components/Bcrumb'
import './Map.scss'

class Map extends React.Component{
    componentDidMount () {
        var map = new BMap.Map("mapContainer"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }

    render() {
        return (
            <div>
                <Bcrumb />
                <Card>
                    <div className="mapContainer" id="mapContainer" style={{height:500}}></div>
                </Card>
            </div>
        );
    }
}
export default Map
