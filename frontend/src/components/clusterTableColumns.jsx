import {Button, Tag, Typography} from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, RightCircleTwoTone} from '@ant-design/icons';
import React from 'react';

const { Text } = Typography;

const clusterTableColumns = (deleteCluster, checkHealth, loadingClusterId) => [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        sorter: (a, b) => a.url.localeCompare(b.url),
    },
    {
        title: 'Status',
        dataIndex: 'healthy',
        key: 'healthy',
        sorter: (a, b) => a.healthy === b.healthy ? 0 : a.healthy ? -1 : 1,
        render: (isHealthy) => (
            <span>
                {isHealthy ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Healthy
                    </Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                        Unhealthy
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
        title: 'Check Status',
        key: 'checkHealth',
        render: (text, record) => (
            <Button
                type="primary"
                icon={<RightCircleTwoTone />}
                onClick={() => checkHealth(record.id)}
                loading={loadingClusterId === record.id}
            >
            </Button>
        ),
    },
    {
        title: 'Delete',
        key: 'delete',
        render: (text, record) => (
            <Button
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => deleteCluster(record.id)}
            >
            </Button>
        ),
    },
];

export default clusterTableColumns;
