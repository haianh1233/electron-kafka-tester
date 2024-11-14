import React, { useState, useEffect } from 'react';
import {Space, Typography, message, Table, Row, Col} from 'antd';
import { LoadingOutlined } from '@ant-design/icons'; // Import the icons
import columnsConfig from '../components/clusterTableColumns.jsx';
import AddClusterDrawer from "../components/AddClusterDrawer";
import {deleteCluster, getClusterHealth, getClusters} from "../api/clusterApi";
import PageContainer from "../layouts/PageContainer";

const { Title, Text } = Typography;

const ClusterManagementPage = () => {
    const [clusters, setClusters] = useState([]);
    const [lastRefreshTime, setLastRefreshTime] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingClusterId, setLoadingClusterId] = useState(null);

    const handleDeleteCluster = async (id) => {
        try {
            await deleteCluster(id);
            message.success('Cluster removed successfully');
            fetchClusters();
        } catch (error) {
            message.error('Failed to remove cluster');
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
        <PageContainer title="Cluster Management">
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
        </PageContainer>
    );
};

export default ClusterManagementPage;
