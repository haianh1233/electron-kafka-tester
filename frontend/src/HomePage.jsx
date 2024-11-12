import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Input, Typography, message, List } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const BACKEND_HEALTH_URL = 'http://localhost:8080/api/v1/clusters/health';

const HomePage = () => {
    const navigate = useNavigate();
    const [brokers, setBrokers] = useState([]);
    const [brokerInput, setBrokerInput] = useState('');
    const [healthStatus, setHealthStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const addBroker = () => {
        if (brokerInput) {
            setBrokers([...brokers, brokerInput]);
            setBrokerInput('');
        } else {
            message.warning('Please enter a broker URL.');
        }
    };

    const removeBroker = (index) => {
        setBrokers(brokers.filter((_, i) => i !== index));
    };

    const handleBrokerInputChange = (e) => {
        setBrokerInput(e.target.value);
    };

    const checkKafkaHealth = async () => {
        if (brokers.length === 0) {
            message.warning('Please add at least one broker URL.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(BACKEND_HEALTH_URL, { brokers });
            setHealthStatus(response.data);
            message.success('Health check successful');
        } catch (error) {
            setHealthStatus('Kafka is not healthy');
            message.error('Health check failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={2}>Kafka Broker Health Check</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                    placeholder="Enter Kafka Broker URL (e.g., localhost:9092)"
                    value={brokerInput}
                    onChange={handleBrokerInputChange}
                    onPressEnter={addBroker}
                />
                <Button onClick={addBroker}>Add Broker</Button>

                <List
                    bordered
                    dataSource={brokers}
                    renderItem={(broker, index) => (
                        <List.Item
                            actions={[
                                <Button type="link" onClick={() => removeBroker(index)}>Remove</Button>
                            ]}
                        >
                            {broker}
                        </List.Item>
                    )}
                    style={{ marginTop: 16 }}
                />

                <Button
                    type="primary"
                    onClick={checkKafkaHealth}
                    loading={loading}
                    style={{ marginTop: 16 }}
                >
                    Check Health
                </Button>

                {healthStatus && (
                    <Text type={healthStatus === 'Kafka is not healthy' ? 'danger' : 'success'}>
                        {healthStatus}
                    </Text>
                )}
            </Space>
        </div>
    );
};

export default HomePage;
