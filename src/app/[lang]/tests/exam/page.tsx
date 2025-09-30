"use client";

import { useState, useEffect } from "react";
import { Card, Typography, Radio, Button, Pagination, Row, Col } from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const questions = [
  { q: "What is the normal human body temperature?", options: ["36°C", "37°C", "38°C", "39°C"], answer: "37°C" },
  { q: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
];

export default function ExamPage() {
  const [current, setCurrent] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // seconds
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[current - 1];

  const handleSubmit = () => {
    router.push("/tests/result");
  };

  return (
    <Row gutter={16} style={{ marginTop: 40, padding: 20 }}>
      <Col span={16}>
        <Card>
          <Title level={4}>Q{current}. {currentQuestion.q}</Title>
          <Radio.Group
            onChange={(e) => setAnswers({ ...answers, [current]: e.target.value })}
            value={answers[current]}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {currentQuestion.options.map((opt) => (
              <Radio key={opt} value={opt}>{opt}</Radio>
            ))}
          </Radio.Group>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Title level={4}>Time Left: {timeLeft}s</Title>
          <Pagination
            current={current}
            total={questions.length}
            pageSize={1}
            onChange={(page) => setCurrent(page)}
            style={{ marginBottom: 20 }}
          />
          <Button type="primary" onClick={handleSubmit}>Submit Test</Button>
        </Card>
      </Col>
    </Row>
  );
}

