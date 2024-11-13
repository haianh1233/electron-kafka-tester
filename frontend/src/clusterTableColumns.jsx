import { Button, Typography } from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, RightCircleTwoTone} from '@ant-design/icons';
import React from 'react';

const { Text } = Typography;

const columns = (deleteCluster, checkHealth, loadingClusterId) => [
    {
        title: 'Cluster Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Broker URL',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: 'Health Status',
        dataIndex: 'healthy',
        key: 'healthy',
        render: (isHealthy) => (
            <span>
                {isHealthy ? (
                    <>
                        <CheckCircleOutlined style={{ color: 'green', marginRight: 4 }} />
                        <Text type="success">Healthy</Text>
                    </>
                ) : (
                    <>
                        <CloseCircleOutlined style={{ color: 'red', marginRight: 4 }} />
                        <Text type="danger">Unhealthy</Text>
                    </>
                )}
            </span>
        ),
    },
    {
        title: 'Last Updated',
        key: 'updatedDate',
        dataIndex: 'updatedDate',
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
        title: 'Check Health',
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

export default columns;
