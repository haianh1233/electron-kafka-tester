import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {Link, Outlet, useLocation} from 'react-router-dom';
import { AppstoreOutlined, ClusterOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
    const location = useLocation();
    const selectedKey = location.pathname.includes('/clusters') ? 'clusterManagement' : 'overview';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} style={{ background: '#ffffff', borderRight: '1px solid #f0f0f0' }} theme="light">
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    theme="light"
                >
                    <Menu.Item key="overview" icon={<AppstoreOutlined />}>
                        <Link to="/overview">Overview</Link>
                    </Menu.Item>
                    <Menu.Item key="clusterManagement" icon={<ClusterOutlined />}>
                        <Link to="/clusters">Clusters</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: 0 }}>
                <Content style={{ margin: 0, padding: '24px', minHeight: '100vh', background: '#ffffff' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;
