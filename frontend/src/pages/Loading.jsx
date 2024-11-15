import React from 'react';
import { Spin, Typography } from 'antd';

const { Text } = Typography;

const Loading = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Spin size="large" />
        <Text style={{ marginTop: 16, textAlign: 'center' }}>
            Initializing the application... Please hold on while we prepare everything for you.
        </Text>
        <Text type="secondary" style={{ marginTop: 8, textAlign: 'center' }}>
            Checking backend services and loading resources. This may take a moment.
        </Text>
    </div>
);

export default Loading;
