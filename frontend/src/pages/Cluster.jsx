import PageContainer from "../layouts/PageContainer";
import {useNavigate} from "react-router-dom";
import {Card, Col, Row, Statistic} from "antd";

const Cluster = () => {
    const navigate = useNavigate();

    const handleBackToClusterManagement = () => {
        navigate('/clusters');
    }


    return (
        <PageContainer title="Conduktor gateway" onBack={handleBackToClusterManagement}>
            <Row gutter={16}>
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