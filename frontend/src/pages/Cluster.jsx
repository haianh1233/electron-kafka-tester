import PageContainer from "../layouts/PageContainer";
import {useNavigate} from "react-router-dom";
import {Card, Col, Flex, Row, Statistic, Table} from "antd";
import auditTableColumns from '../components/auditTableColumns.jsx';
import PieChart from "../components/PieChart";
import Score from "../components/Score";

const Cluster = () => {
    const navigate = useNavigate();

    const handleBackToClusterManagement = () => {
        navigate('/clusters');
    }

    const failedRulesData = [
        {name: 'High', value: 3, itemStyle: {color: '#f5222d'}},
        {name: 'Moderate', value: 5, itemStyle: {color: '#fa8c16'}},
        {name: 'Low', value: 10, itemStyle: {color: '#52c41a'}},
    ]

    const auditDataSource = [
        { key: '1', name: 'Test A', status: true, level: 'Low', updatedDate: '2023-11-22T00:00:00' },
        { key: '2', name: 'Test B', status: false, level: 'High', updatedDate: '2023-11-03T00:00:00' },
        { key: '3', name: 'Test C', status: false, level: 'Moderate', updatedDate: '2023-11-21T00:00:00' },
        { key: '4', name: 'Test D', status: true, level: 'High', updatedDate: '2023-11-28T00:00:00' },
        { key: '5', name: 'Test E', status: true, level: 'High', updatedDate: '2023-11-16T00:00:00' },
        { key: '6', name: 'Test F', status: true, level: 'Low', updatedDate: '2023-11-02T00:00:00' },
        { key: '7', name: 'Test G', status: true, level: 'Moderate', updatedDate: '2023-11-09T00:00:00' },
        { key: '8', name: 'Test H', status: false, level: 'Moderate', updatedDate: '2023-11-13T00:00:00' },
        { key: '9', name: 'Test I', status: false, level: 'High', updatedDate: '2023-11-23T00:00:00' },
        { key: '10', name: 'Test J', status: true, level: 'Low', updatedDate: '2023-11-11T00:00:00' },
        { key: '11', name: 'Test K', status: true, level: 'High', updatedDate: '2023-11-21T00:00:00' },
        { key: '12', name: 'Test L', status: true, level: 'Moderate', updatedDate: '2023-11-06T00:00:00' },
        { key: '13', name: 'Test M', status: true, level: 'Low', updatedDate: '2023-11-27T00:00:00' },
        { key: '14', name: 'Test N', status: true, level: 'Low', updatedDate: '2023-11-16T00:00:00' },
        { key: '15', name: 'Test O', status: false, level: 'High', updatedDate: '2023-11-22T00:00:00' },
        { key: '16', name: 'Test P', status: false, level: 'High', updatedDate: '2023-11-11T00:00:00' },
        { key: '17', name: 'Test Q', status: false, level: 'Low', updatedDate: '2023-11-14T00:00:00' },
        { key: '18', name: 'Test R', status: true, level: 'Low', updatedDate: '2023-11-14T00:00:00' },
        { key: '19', name: 'Test S', status: true, level: 'Low', updatedDate: '2023-11-12T00:00:00' },
        { key: '20', name: 'Test T', status: false, level: 'Low', updatedDate: '2023-11-09T00:00:00' }
    ];


    console.log(auditTableColumns())


    return (
        <PageContainer title="Conduktor gateway" onBack={handleBackToClusterManagement}>
            <Flex gap="middle" vertical>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Score title="Cluster score" score="50" height="350px"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Score title="Passed rules" score="10" maxScore="30" height="350px"/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <PieChart title="Failed Rules Breakdown" data={failedRulesData} height="350px"/>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Budget"
                                value={5001234}
                                precision={2}
                                prefix="$"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Number of topics"
                                value={5320}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Statistic
                                title="Number of partitions"
                                value={53123355}
                            />
                        </Card>
                    </Col>
                </Row>

                <Table
                    columns={auditTableColumns()}
                    dataSource={auditDataSource}
                    rowKey="name"
                    pagination
                />
            </Flex>
        </PageContainer>
    );
}

export default Cluster;