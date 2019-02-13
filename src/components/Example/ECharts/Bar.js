import React from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from './themeConfig/echartTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class Bar extends React.Component {

    componentWillMount() {
        echarts.registerTheme('React', echartTheme);
    }

    getOption () {
        let option = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '数据量',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }
        return option;
    }

    getOption2(){
        let option = {
            title: {
                text: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:['百度','腾讯','阿里']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '百度',
                    type: 'bar',
                    data: [
                        2000,
                        3000,
                        5500,
                        7000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '腾讯',
                    type: 'bar',
                    data: [
                        1500,
                        3000,
                        4500,
                        6000,
                        8000,
                        10000,
                        15000
                    ]
                },
                {
                    name: '阿里',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        2500,
                        4000,
                        6000,
                        7000,
                        8000
                    ]
                },
            ]
        }
        return option;
    }

    render(){
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption2()} theme="React" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption()} theme="React" notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
                </Card>

            </div>
        );
    }
}

export default Bar
