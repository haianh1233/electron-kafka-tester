import PageContainer from "../layouts/PageContainer";
import {Card, Col, Row, Statistic} from "antd";
import PieChart from "../components/PieChart";
import GaugeRating from "../components/GaugeRating";
import Score from "../components/Score";

const Overview = () => {
    return (
        <PageContainer title="Overview">
            <Card>
                <Score score='80' />
                <Score score='30' />
                <Score score='50' />
            </Card>
            <GaugeRating />
            <Row gutter={16}>

            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false}>
                        <GaugeRating />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <PieChart />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Total Sales"
                            value={112893}
                            precision={2}
                            prefix="$"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default Overview;