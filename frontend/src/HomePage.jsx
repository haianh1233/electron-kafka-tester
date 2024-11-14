import React, { useState, useEffect } from 'react';
import {Space, Typography, message, Table, Row, Col} from 'antd';
import { LoadingOutlined } from '@ant-design/icons'; // Import the icons
import columnsConfig from './clusterTableColumns.jsx';
import AddClusterDrawer from "./AddClusterDrawer";
import {deleteCluster, getClusterHealth, getClusters} from "./api/clusterApi";

const { Title, Text } = Typography;

const HomePage = () => {
    const [clusters, setClusters] = useState([]);
    const [lastRefreshTime, setLastRefreshTime] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingClusterId, setLoadingClusterId] = useState(null);

    const handleDeleteCluster = async (id) => {
        try {
            await deleteCluster(id);
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
            const response = await getClusterHealth(id);

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
            const response = await getClusters();
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
                    columns={columnsConfig(handleDeleteCluster, checkHealth, loadingClusterId)}
                    dataSource={clusters}
                    rowKey="id"
                    pagination
                />
            </Space>
        </div>
    );
};

export default HomePage;
