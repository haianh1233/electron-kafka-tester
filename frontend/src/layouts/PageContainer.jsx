import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const PageContainer = ({ title, children }) => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={2} style={{ margin: 0 }}>{title}</Title>
                    </Col>
                </Row>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default PageContainer;
