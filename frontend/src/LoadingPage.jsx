import React from 'react';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

const LoadingPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Loading... Please wait while we check the backend health.</Text>
    </div>
);

export default LoadingPage;
