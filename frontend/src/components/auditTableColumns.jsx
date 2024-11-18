import {Button, Tag, Typography} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    RightCircleTwoTone
} from '@ant-design/icons';
import React from 'react';

const { Text } = Typography;

const auditTableColumns = () => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status === b.status ? 0 : a.status ? -1 : 1,
        render: (isPassed) => (
            <span>
            {isPassed ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Pass
                </Tag>
            ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                    Not Passed
                </Tag>
            )}
            </span>
        ),
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        sorter: (a, b) => {
            const priority = {High: 1, Moderate: 2, Low: 3};
            return priority[a.level] - priority[b.level];
        },
        render: (level) => {
            let color = '';
            switch (level) {
                case 'High':
                    color = 'red';
                    break;
                case 'Moderate':
                    color = 'orange';
                    break;
                case 'Low':
                    color = 'green';
                    break;
            }
            return (
                <Tag icon={<ExclamationCircleOutlined />} color={color} key={level}>
                    {level}
                </Tag>
            );
        }
    },
    {
        title: 'Last Updated',
        key: 'updatedDate',
        dataIndex: 'updatedDate',
        sorter: (a, b) => new Date(a.updatedDate) - new Date(b.updatedDate),
        render: (updatedDate) => {
            const date = new Date(updatedDate);
            return date.toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Button
                type="primary"
                disabled={record.status}
                onClick={() => {

                }}
            >
                Fix Now
            </Button>
        ),
    },
];

export default auditTableColumns;
