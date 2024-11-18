
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';

const Score = ({ title, score, maxScore = 100, height = '300px' }) => {
    const remaining = maxScore - score;

    const percentage = (score / maxScore) * 100;
    const calculateScoreColor = (percentage) => {
        if (percentage >= 80) {
            return '#4CAF50'; // Green for high scores
        } else if (percentage >= 50) {
            return '#FFA500'; // Orange for medium scores
        } else {
            return '#FF4C4C'; // Red for low scores
        }
    };

    const scoreColor = calculateScoreColor(percentage);

    const option = {
        title: [
            {
                text: title,
                left: 'left',
                top: '5%',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
            },
            {
                text: `${score} / ${maxScore}`,
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            },
        ],
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
            <ReactECharts option={option} style={{ height: height }} />
        </div>
    );
};

export default Score;
