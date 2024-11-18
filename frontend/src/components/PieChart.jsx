import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ title = 'Pie Chart', data = [], height = '300px'}) => {
    const option = {
        title: {
            text: title,
            left: 'left',
            top: '5%',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: '0%',
            textStyle: {
                fontSize: 12,
            },
            formatter: (name) => {
                const item = data.find((d) => d.name === name);
                return `${name}: ${item?.value || 0}`;
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactECharts option={option} style={{ height: '300px' }} />
        </div>
    );
};

export default PieChart;
