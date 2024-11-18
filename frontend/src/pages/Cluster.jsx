import PageContainer from "../layouts/PageContainer";
import {useLocation, useNavigate} from "react-router-dom";
import {Card, Col, Flex, Row, Statistic, Table} from "antd";
import auditTableColumns from '../components/auditTableColumns.jsx';
import PieChart from "../components/PieChart";
import Score from "../components/Score";

const Cluster = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackToClusterManagement = () => {
        navigate('/clusters');
    }

    const onButtonClick = (key) => {
        const currentPath = location.pathname;
        navigate(`${currentPath}/rules/${key}`);
    };


    const failedRulesData = [
        {name: 'High', value: 3, itemStyle: {color: '#f5222d'}},
        {name: 'Moderate', value: 5, itemStyle: {color: '#fa8c16'}},
        {name: 'Low', value: 10, itemStyle: {color: '#52c41a'}},
    ]

    const auditDataSource = [
        { key: '1', name: 'Test A', status: false, level: 'Low', updatedDate: '2023-11-08T00:00:00', types: ['Performance', 'Cost', 'Good_Practice'], labels: ['Encryption', 'Cluster'] },
        { key: '2', name: 'Test B', status: true, level: 'Low', updatedDate: '2023-11-11T00:00:00', types: ['Performance', 'Cost'], labels: ['Partition'] },
        { key: '3', name: 'Test C', status: false, level: 'Low', updatedDate: '2023-11-20T00:00:00', types: ['Cost', 'Performance', 'Governance'], labels: ['Partition'] },
        { key: '4', name: 'Test D', status: true, level: 'High', updatedDate: '2023-11-14T00:00:00', types: ['Cost', 'Good_Practice', 'Performance'], labels: ['Compression'] },
        { key: '5', name: 'Test E', status: false, level: 'Low', updatedDate: '2023-11-12T00:00:00', types: ['Governance', 'Risk', 'Security'], labels: ['Partition'] },
        { key: '6', name: 'Test F', status: true, level: 'Moderate', updatedDate: '2023-11-22T00:00:00', types: ['Security', 'Cost', 'Performance'], labels: ['Cluster', 'Encryption'] },
        { key: '7', name: 'Test G', status: false, level: 'Low', updatedDate: '2023-11-19T00:00:00', types: ['Good_Practice', 'Security', 'Risk'], labels: ['Cluster', 'Partition'] },
        { key: '8', name: 'Test H', status: true, level: 'Moderate', updatedDate: '2023-11-21T00:00:00', types: ['Security', 'Risk', 'Performance'], labels: ['Encryption', 'Cluster'] },
        { key: '9', name: 'Test I', status: false, level: 'High', updatedDate: '2023-11-11T00:00:00', types: ['Security', 'Performance'], labels: ['Topic', 'Compression'] },
        { key: '10', name: 'Test J', status: true, level: 'Low', updatedDate: '2023-11-08T00:00:00', types: ['Security', 'Cost', 'Performance'], labels: ['Cluster', 'Topic'] },
        { key: '11', name: 'Test K', status: false, level: 'Low', updatedDate: '2023-11-23T00:00:00', types: ['Risk', 'Good_Practice'], labels: ['Compression', 'Partition'] },
        { key: '12', name: 'Test L', status: true, level: 'Moderate', updatedDate: '2023-11-14T00:00:00', types: ['Performance', 'Cost'], labels: ['Partition', 'Topic'] },
        { key: '13', name: 'Test M', status: false, level: 'Low', updatedDate: '2023-11-04T00:00:00', types: ['Governance', 'Good_Practice', 'Security'], labels: ['Topic'] },
        { key: '14', name: 'Test N', status: true, level: 'Moderate', updatedDate: '2023-11-18T00:00:00', types: ['Performance', 'Good_Practice', 'Security'], labels: ['Topic', 'Compression'] },
        { key: '15', name: 'Test O', status: false, level: 'Moderate', updatedDate: '2023-11-16T00:00:00', types: ['Risk', 'Performance'], labels: ['Topic'] },
        { key: '16', name: 'Test P', status: true, level: 'Low', updatedDate: '2023-11-20T00:00:00', types: ['Risk', 'Performance', 'Good_Practice'], labels: ['Topic'] },
        { key: '17', name: 'Test Q', status: false, level: 'High', updatedDate: '2023-11-05T00:00:00', types: ['Governance', 'Security', 'Risk'], labels: ['Topic'] },
        { key: '18', name: 'Test R', status: true, level: 'High', updatedDate: '2023-11-23T00:00:00', types: ['Security', 'Cost'], labels: ['Topic', 'Cluster'] },
        { key: '19', name: 'Test S', status: false, level: 'Low', updatedDate: '2023-11-03T00:00:00', types: ['Performance', 'Cost'], labels: ['Compression', 'Topic'] },
        { key: '20', name: 'Test T', status: true, level: 'Low', updatedDate: '2023-11-21T00:00:00', types: ['Risk', 'Security', 'Cost'], labels: ['Topic', 'Encryption'] },
    ];

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
                    columns={auditTableColumns(onButtonClick)}
                    dataSource={auditDataSource}
                    rowKey="name"
                    pagination
                />
            </Flex>
        </PageContainer>
    );
}

export default Cluster;