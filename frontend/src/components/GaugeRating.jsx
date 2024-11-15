import ReactECharts from "echarts-for-react";

const GaugeRating = ({ rating }) => {
    const ratingPercentage = rating * 20;

    const option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.5, '#FDDD60'],
                            [0.75, '#58D9F9'],
                            [1, '#7CFFB2']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 40,
                    offsetCenter: [0, '-70%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 10,
                    lineStyle: {
                        color: 'auto',
                        width: 4
                    }
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        color: 'auto',
                        width: 10
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 20,
                    distance: -35,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 0.875) {
                            return 'A';
                        } else if (value === 0.625) {
                            return 'B';
                        } else if (value === 0.375) {
                            return 'C';
                        } else if (value === 0.125) {
                            return 'D';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 30
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: 0.7,
                        name: 'Cluster Rating'
                    }
                ]
            }
        ]
    };


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactECharts option={option} style={{ height: '400px' }} />
        </div>
    );
}

export default GaugeRating;