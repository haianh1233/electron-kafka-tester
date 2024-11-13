import React, { useState } from 'react';
import {Button, Col, Drawer, Form, Input, message, Row} from 'antd';
import axios from 'axios';
import {ADD_CLUSTER_URL} from "./HomePage";
import {PlusOutlined} from "@ant-design/icons";

const AddClusterDrawer = ({ onClusterCreated }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
        setTimeout(() => {
            form.resetFields();
        }, 300);
    };

    const onFinish = async (values) => {
        const { name, url } = values;
        const clusterData = {
            name: name || url,
            url,
        };

        setLoading(true);
        try {
            await axios.post(ADD_CLUSTER_URL, clusterData);
            message.success('Cluster created successfully');
            onClusterCreated();
            closeDrawer();
        } catch (error) {
            message.error('Failed to create cluster');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        form.resetFields();
    };

    return (
        <div>
            <Button type="primary"
                    icon={<PlusOutlined />}
                    onClick={showDrawer}>
                Add Cluster
            </Button>
            <Drawer
                title="Add Cluster"
                placement="right"
                onClose={closeDrawer}
                open={visible}
                width={400}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Cluster Name"
                        name="name"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="Enter cluster name" />
                    </Form.Item>
                    <Form.Item
                        label="Broker URL"
                        name="url"
                    >
                        <Input placeholder="Enter broker URL (e.g., localhost:9092)" />
                    </Form.Item>
                    <Row justify="space-between" gutter={16} style={{ marginTop: '16px' }}>
                        <Col span={12}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{ width: '100%' }}
                            >
                                Add
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                onClick={handleClear}
                                style={{ width: '100%' }}
                            >
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    );
};

export default AddClusterDrawer;
