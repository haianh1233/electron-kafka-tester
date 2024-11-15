
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';

const ClusterScore = () => {
    const maxScore = 100;
    const [score, setScore] = useState(20);

    useEffect(() => {
        const scores = [20, 60, 90];
        let index = 0;

        const interval = setInterval(() => {
            setScore(scores[index]);
            index = (index + 1) % scores.length;
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const remaining = maxScore - score;

    let scoreColor;
    if (score >= 80) {
        scoreColor = '#4CAF50';
    } else if (score >= 50) {
        scoreColor = '#FFA500';
    } else {
        scoreColor = '#FF4C4C';
    }

    const option = {
        title: {
            text: `${score} / ${maxScore}`,
            left: 'center',
            top: 'center',
            textStyle: {
                fontSize: 20,
                fontWeight: 'bold',
            },
        },
        tooltip: {
            show: false,
        },
        series: [
            {
                type: 'pie',
                radius: ['70%', '90%'],
                avoidLabelOverlap: false,
                label: { show: false },
                data: [
                    { value: score, name: 'Score', itemStyle: { color: scoreColor } },
                    { value: remaining, name: 'Remaining', itemStyle: { color: '#D9D9D9' } },
                ],
                emphasis: {
                    disabled: true,
                },
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactECharts option={option} style={{ height: '400px' }} />
        </div>
    );
};

export default ClusterScore;
