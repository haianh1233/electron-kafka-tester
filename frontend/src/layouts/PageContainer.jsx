import React from 'react';
import {Row, Col, Typography, Button, Flex} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PageContainer = ({ title, children, onBack }) => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <Row justify="space-between" align="middle">
                    <Flex align="center">
                        {onBack && (
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={onBack}
                                style={{ marginRight: '16px' }}
                            >
                            </Button>
                        )}
                        <Title
                            level={onBack ? 3 : 2}
                            style={{ margin: 0 }}
                        >
                            {title}
                        </Title>
                    </Flex>
                </Row>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default PageContainer;
