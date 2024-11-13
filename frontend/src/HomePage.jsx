import React, { useState, useEffect } from 'react';
import {Button, Space, Input, Typography, message, Table, Row, Col} from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'; // Import the icons
import axios from 'axios';
import columnsConfig from './clusterTableColumns.jsx';
import AddClusterDrawer from "./AddClusterDrawer";

const { Title, Text } = Typography;

export const ADD_CLUSTER_URL = 'http://localhost:8080/api/v1/clusters';
export const GET_CLUSTERS_URL = 'http://localhost:8080/api/v1/clusters';
export const DELETE_CLUSTER_URL = (id) => `http://localhost:8080/api/v1/clusters/${id}`;
export const HEALTH_CHECK_URL = (id) => `http://localhost:8080/api/v1/clusters/${id}/health`;

const HomePage = () => {
    const [clusterName, setClusterName] = useState('');
    const [clusterUrl, setClusterUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [clusters, setClusters] = useState([]);
    const [lastRefreshTime, setLastRefreshTime] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingClusterId, setLoadingClusterId] = useState(null);

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

    const checkHealth = async (id) => {
        setLoadingClusterId(id);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await axios.get(HEALTH_CHECK_URL(id));

            if (response.status === 200) {
                message.success('Cluster is healthy');
            } else {
                message.error('Cluster is unhealthy');
            }
        } catch (error) {
            message.error('Cluster is unhealthy');
        } finally {
            setLoadingClusterId(null);
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
            }, 500);
            setRefreshing(false);

        }
    };

    useEffect(() => {
        fetchClusters();
        const intervalId = setInterval(fetchClusters, 20_000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Title level={2}>Kafka Cluster Management</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        {lastRefreshTime && (
                            <Text style={{ fontSize: '14px', color: 'gray' }}>
                                Last refreshed at: {lastRefreshTime}{' '}
                                {refreshing && <LoadingOutlined spin />}
                            </Text>
                        )}
                    </Col>
                    <Col>
                        <AddClusterDrawer onClusterCreated={fetchClusters} />
                    </Col>
                </Row>
                <Table
                    columns={columnsConfig(deleteCluster, checkHealth, loadingClusterId)}
                    dataSource={clusters}
                    rowKey="id"
                    pagination={true}
                />
            </Space>
        </div>
    );
};

export default HomePage;
