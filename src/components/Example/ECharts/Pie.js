import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import themeLight from './themeConfig/themeLight'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import Bcrumb from '@/components/Bcrumb'

class Pie extends React.Component {

    componentWillMount() {
        echarts.registerTheme('React', themeLight);
    }

    getOption() {
        let option = {
            title: {
                text: '',
                x : 'center'
            },
            legend : {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip: {
                trigger : 'item',
                formatter : "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name : '数据量',
                    type : 'pie',
                    radius : '55%',
                    center : [
                        '50%', '35%'
                    ],
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        },
                    ],
                    itemStyle : {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: '',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
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
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '数据量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: [
                        '50%', '47%'
                    ],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        }, {
                            value: 1000,
                            name: '周二'
                        }, {
                            value: 2000,
                            name: '周三'
                        }, {
                            value: 1500,
                            name: '周四'
                        }, {
                            value: 3000,
                            name: '周五'
                        }, {
                            value: 2000,
                            name: '周六'
                        }, {
                            value: 1200,
                            name: '周日'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: '',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
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
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '数据量',
                    type: 'pie',
                    radius: '55%',
                    center: [
                        '50%', '35%'
                    ],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        }, {
                            value: 1000,
                            name: '周二'
                        }, {
                            value: 2000,
                            name: '周三'
                        }, {
                            value: 1500,
                            name: '周四'
                        }, {
                            value: 3000,
                            name: '周五'
                        }, {
                            value: 2000,
                            name: '周六'
                        }, {
                            value: 1200,
                            name: '周日'
                        }
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Bcrumb />
                <Card title="饼形图表之一">
                    <ReactEcharts
                        option={this.getOption()}
                        theme="React"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 360 }}/>
                </Card>
                <Card title="饼形图之二" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="React"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 360 }}/>
                </Card>
                <Card title="饼形图之三" style={{marginTop:10}}>
                    <ReactEcharts
                        option={this.getOption3()}
                        theme="React"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{ height: 360 }}/>
                </Card>
            </div>
        );
    }
}

export default Pie
