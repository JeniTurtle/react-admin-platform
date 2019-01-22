import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from './themeConfig/echartTheme'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import Bcrumb from '@/components/Bcrumb'

class Line extends React.Component {

    state = {}

    componentWillMount(){
        echarts.registerTheme('React',echartTheme);
    }

    getOption() {
        let option = {
            title: {
                text: ''
            },
            tooltip: {
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
                    type: 'line',
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

    getOption2() {
        let option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['测试数据量一','测试数据量二']
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
                    name: '测试数据量一',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                },
                {
                    name: '测试数据量二',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                },
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type:'category',
                boundaryGap: false,
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
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Bcrumb />
                <Card title="折线图表之一">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="React"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                            height: 500
                        }}/>
                </Card>
                <Card title="折线图表之二" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="React"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                            height: 500
                        }}/>
                </Card>
                <Card title="折线图表之三" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption3()}
                        theme="React"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                            height: 500
                        }}/>
                </Card>
            </div>
        );
    }
}

export default Line
