import PageContainer from "../layouts/PageContainer";
import {useNavigate} from "react-router-dom";
import {Card, Col, Row, Statistic} from "antd";
import GaugeRating from "../components/GaugeRating";
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


    return (
        <PageContainer title="Conduktor gateway" onBack={handleBackToClusterManagement}>
            <Row gutter={[16, 16]} style={{ marginBottom: '10px'}}>
                <Col span={8}>
                    <Card bordered={false}>
                        <Score title="Cluster score" score="50" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Score title="Passed rules" score="10" maxScore="30" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <PieChart title="Failed Rules Breakdown" data={failedRulesData} />
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
        </PageContainer>
    );
}

export default Cluster;