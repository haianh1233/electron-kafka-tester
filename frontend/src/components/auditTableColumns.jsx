import {Button, Tag, Typography} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import React from 'react';

const { Text } = Typography;

const auditType = {
    Cost: 'Cost',
    Governance: 'Governance',
    Security: 'Security',
    Performance: 'Performance',
    Good_Practice: 'Good Practice',
    Risk: 'Risk',
}

const auditLabel = {
    Topic: 'Topic',
    Partition: 'Partition',
    Cluster: 'Cluster',
    Compression: 'Compression',
    Encryption: 'Encryption',
}


const auditTableColumns = () => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Types',
        dataIndex: 'types',
        key: 'types',
        render: (types) => {
            if (!Array.isArray(types)) return null;

            const sortedTypes = types.slice().sort((a, b) => a.localeCompare(b));

            return sortedTypes.map((type) => {
                let color = '';
                switch (type) {
                    case auditType.Cost:
                        color = 'magenta';
                        break;
                    case auditType.Governance:
                        color = 'red';
                        break;
                    case auditType.Security:
                        color = 'volcano';
                        break;
                    case auditType.Performance:
                        color = 'orange';
                        break;
                    case auditType.Good_Practice:
                        color = 'gold';
                        break;
                    case auditType.Risk:
                        color = 'lime';
                        break;
                    default:
                        color = 'green';
                        break;
                }
                return (
                    <Tag color={color} key={type}>
                        {auditType[type] || type}
                    </Tag>
                );
            });
        }
    },
    {
        title: 'Labels',
        dataIndex: 'labels',
        key: 'labels',
        render: (labels) => {
            if (!Array.isArray(labels)) return null;

            const sortedLabels = labels.slice().sort((a, b) => a.localeCompare(b));

            return sortedLabels.map((label) => {
                let color = '';
                switch (label) {
                    case auditLabel.Topic:
                        color = 'magenta';
                        break;
                    case auditLabel.Partition:
                        color = 'orange';
                        break;
                    case auditLabel.Cluster:
                        color = 'gold';
                        break;
                    case auditLabel.Compression:
                        color = 'lime';
                        break;
                    case auditLabel.Encryption:
                        color = 'lime';
                        break;
                    default:
                        color = 'green';
                        break;
                }
                return (
                    <Tag color={color} key={label}>
                        {auditLabel[label] || label}
                    </Tag>
                );
            });
        }
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
