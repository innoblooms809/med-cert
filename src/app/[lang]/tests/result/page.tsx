"use client";

import { Card, Typography, Row, Col, Tabs, Button, List } from "antd";

const { Title } = Typography;

const analysis = {
  answered: 2,
  skipped: 0,
  correct: 1,
  incorrect: 1,
};

const questions = [
  { q: "Normal body temperature?", user: "36°C", correct: "37°C" },
  { q: "Vitamin from sunlight?", user: "Vitamin D", correct: "Vitamin D" },
];

export default function ResultPage() {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Title level={4}>Your Performance</Title>
            <p>Answered: {analysis.answered}</p>
            <p>Skipped: {analysis.skipped}</p>
            <p>Correct: {analysis.correct}</p>
            <p>Incorrect: {analysis.incorrect}</p>
            <Button type="primary">Download Report</Button>
          </Card>
        </Col>
        <Col span={16}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Performance Analysis" key="1">
              <p>[Chart will go here]</p>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Question Review" key="2">
              <List
                dataSource={questions}
                renderItem={(question, i) => {
                  const answerColor = { color: question.user === question.correct ? "green" : "red" };
                  return (
                    <List.Item>
                      <div>
                        Your Answer: <span style={answerColor}>{question.user}</span><br />
                        Correct Answer: <span style={{ color: "green" }}>{question.correct}</span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
