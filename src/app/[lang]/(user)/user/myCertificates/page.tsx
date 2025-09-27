"use client";
import { Card, Row, Col, Typography, Tabs, Button } from "antd";

const { Title, Paragraph } = Typography;

const trending = [
  "Dentist", "Gynecologist", "General Physician", "Dermatologist", "ENT Specialist", "Homoeopath", "Ayurveda"
];

const doctorTests = [
  { title: "Dentist Mock Test", desc: "Practice dentistry questions.", img: "/images/dentist.jpg" },
  { title: "Gynecologist Mock Test", desc: "Test your knowledge in gynecology.", img: "/images/gynecologist.jpg" },
];

const nurseTests = [
  { title: "Nursing Fundamentals", desc: "Core concepts for nurses.", img: "/images/nurse1.jpg" },
  { title: "Clinical Nursing", desc: "Clinical practice questions.", img: "/images/nurse2.jpg" },
];

export default function TestsPage() {
  return (
    <div style={{ padding: 24 }}>
      {/* Hero */}
      <Row justify="center" style={{ textAlign: "center", marginBottom: 40 }}>
        <Col span={16}>
          <Title>Unlock Perfection</Title>
          <Paragraph>
            Solve real-world medical problems & practice tests to get ready for your dream healthcare job!
          </Paragraph>
        </Col>
      </Row>

      {/* Trending Domains */}
      <Title level={3}>Trending Domains</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 40 }}>
        {trending.map((item) => (
          <Col xs={12} md={6} lg={4} key={item}>
            <Card hoverable>{item}</Card>
          </Col>
        ))}
      </Row>

      {/* Mock Tests */}
      <Title level={3}>AI-Powered Mock Tests</Title>
      <Tabs defaultActiveKey="doctor">
        <Tabs.TabPane tab="Doctors" key="doctor">
          <Row gutter={[16, 16]}>
            {doctorTests.map((test) => (
              <Col xs={24} md={12} lg={6} key={test.title}>
                <Card
                  hoverable
                  cover={<img src={test.img} alt={test.title} />}
                  actions={[<Button type="link" href="/tests/difficulty">Start Test</Button>]}
                >
                  <Card.Meta title={test.title} description={test.desc} />
                </Card>
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Nurses" key="nurse">
          <Row gutter={[16, 16]}>
            {nurseTests.map((test) => (
              <Col xs={24} md={12} lg={6} key={test.title}>
                <Card
                  hoverable
                  cover={<img src={test.img} alt={test.title} />}
                  actions={[<Button type="link" href="/tests/difficulty">Start Test</Button>]}
                >
                  <Card.Meta title={test.title} description={test.desc} />
                </Card>
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
