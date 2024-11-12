import React, { useState, useEffect } from 'react';
import { Button, Space, Input, Typography, message, Table } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'; // Import the icons
import axios from 'axios';

const { Title, Text } = Typography;

const ADD_CLUSTER_URL = 'http://localhost:8080/api/v1/clusters';
const GET_CLUSTERS_URL = 'http://localhost:8080/api/v1/clusters';
const DELETE_CLUSTER_URL = (id) => `http://localhost:8080/api/v1/clusters/${id}`;

const HomePage = () => {
    const [clusterName, setClusterName] = useState('');
    const [clusterUrl, setClusterUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [clusters, setClusters] = useState([]);
    const [lastRefreshTime, setLastRefreshTime] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const handleClusterNameChange = (e) => {
        setClusterName(e.target.value);
    };

    const handleClusterUrlChange = (e) => {
        setClusterUrl(e.target.value);
    };

    const addCluster = async () => {
        if (!clusterUrl) {
            message.warning('Please enter a cluster URL.');
            return;
        }

        const name = clusterName || clusterUrl;

        setLoading(true);
        try {
            await axios.post(ADD_CLUSTER_URL, { name, url: clusterUrl });
            message.success('Cluster added successfully');
            fetchClusters();
            setClusterName('');
            setClusterUrl('');
        } catch (error) {
            message.error('Failed to add cluster');
        } finally {
            setLoading(false);
        }
    };

    const deleteCluster = async (id) => {
        try {
            await axios.delete(DELETE_CLUSTER_URL(id));
            message.success('Cluster deleted successfully');
            fetchClusters();
        } catch (error) {
            message.error('Failed to delete cluster');
        }
    };

    const fetchClusters = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(GET_CLUSTERS_URL);
            setClusters(response.data);
            setLastRefreshTime(new Date().toLocaleTimeString());
        } catch (error) {
            message.error('Failed to load clusters');
        } finally {
            setTimeout(() => {
                setRefreshing(false);
            }, 1000);
        }
    };

    useEffect(() => {
        fetchClusters();
        const intervalId = setInterval(fetchClusters, 10000);

        return () => clearInterval(intervalId);
    }, []);

    // Ant Design Table columns for displaying clusters
    const columns = [
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
                <Text type={isHealthy ? 'success' : 'danger'}>
                    {isHealthy ? 'Healthy' : 'Unhealthy'}
                </Text>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => deleteCluster(record.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Title level={2}>Kafka Cluster Management</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    placeholder="Enter Cluster Name (optional)"
                    value={clusterName}
                    onChange={handleClusterNameChange}
                />
                <Input
                    placeholder="Enter Kafka Broker URL (e.g., localhost:9092)"
                    value={clusterUrl}
                    onChange={handleClusterUrlChange}
                    onPressEnter={addCluster}
                    style={{ marginTop: 8 }}
                />

                <Button
                    type="primary"
                    onClick={addCluster}
                    loading={loading}
                    style={{ marginTop: 16 }}
                >
                    Add Cluster
                </Button>

                <Title level={3} style={{ marginTop: 32 }}>Cluster List</Title>
                {lastRefreshTime && (
                    <Text style={{ fontSize: '14px', color: 'gray' }}>
                        Last refreshed at: {lastRefreshTime}{' '}
                        {refreshing && <LoadingOutlined spin />}
                    </Text>
                )}
                <Table
                    columns={columns}
                    dataSource={clusters}
                    rowKey="id"
                    pagination={false}
                />
            </Space>
        </div>
    );
};

export default HomePage;
