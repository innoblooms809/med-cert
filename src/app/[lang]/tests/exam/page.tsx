"use client";

import { useState, useEffect } from "react";
import { Typography, Radio, Button, Pagination, Row, Col, Divider, Alert } from "antd";
import { useRouter } from "next/navigation";
import { ClockCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Get test info from sessionStorage
    const storedTest = sessionStorage.getItem('currentTest');
    if (storedTest) {
      const test = JSON.parse(storedTest);
      setTestInfo(test);
      setTimeLeft(test.duration * 60); // Convert minutes to seconds
      setQuestions(test.questions || []);
      
      // Load any previously saved answers
      const savedAnswers = sessionStorage.getItem('userAnswers');
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        setUserAnswers(parsedAnswers);
        setAnsweredCount(Object.keys(parsedAnswers).length);
      }
    } else {
      router.push('/tests');
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = {
      ...userAnswers,
      [currentQuestion]: answer
    };
    setUserAnswers(newAnswers);
    setAnsweredCount(Object.keys(newAnswers).length);
    
    // Save answers to sessionStorage
    sessionStorage.setItem('userAnswers', JSON.stringify(newAnswers));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index + 1] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const results = {
      testInfo,
      score,
      totalQuestions: questions.length,
      userAnswers,
      questions,
      timeSpent: (testInfo.duration * 60) - timeLeft,
      submittedAt: new Date().toISOString()
    };
    sessionStorage.setItem('testResults', JSON.stringify(results));
    router.push("/tests/result");
  };

  const handleAutoSubmit = () => {
    const score = calculateScore();
    const results = {
      testInfo,
      score,
      totalQuestions: questions.length,
      userAnswers,
      questions,
      timeSpent: testInfo.duration * 60,
      submittedAt: new Date().toISOString(),
      autoSubmitted: true
    };
    sessionStorage.setItem('testResults', JSON.stringify(results));
    router.push("/tests/result");
  };

  const getQuestionStatus = (questionIndex: number) => {
    return userAnswers[questionIndex] ? "answered" : "unanswered";
  };

  if (!testInfo || questions.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  const currentQ = questions[currentQuestion - 1];

  return (
    <Row style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Left side - Question Panel */}
      <Col
        span={16}
        style={{
          padding: "40px 60px",
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <Title level={4} style={{ color: "#666", marginBottom: 5 }}>
            {testInfo.title}
          </Title>
          <Title level={3} style={{ marginBottom: 10 }}>
            Question {currentQuestion} of {questions.length}
          </Title>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {currentQ.question}
          </Text>
        </div>

        <Radio.Group
          onChange={(e) => handleAnswerSelect(e.target.value)}
          value={userAnswers[currentQuestion]}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {currentQ.options.map((opt: string, index: number) => (
            <Radio
              key={index}
              value={opt}
              style={{
                padding: "16px",
                border: "1px solid #d9d9d9",
                borderRadius: "8px",
                transition: "all 0.3s",
                fontSize: "16px",
                margin: 0
              }}
            >
              {opt}
            </Radio>
          ))}
        </Radio.Group>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <Button
            onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
            disabled={currentQuestion === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentQuestion(prev => Math.min(questions.length, prev + 1))}
            disabled={currentQuestion === questions.length}
          >
            Next
          </Button>
        </div>
      </Col>

      {/* Right side - Timer + Controls */}
      <Col span={8} style={{ padding: "40px 30px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            marginBottom: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
            <ClockCircleOutlined style={{ fontSize: 20, color: "#1890ff", marginRight: 10 }} />
            <Title level={4} style={{ margin: 0 }}>Time Remaining</Title>
          </div>
          <Text strong style={{ 
            fontSize: 28, 
            color: timeLeft < 300 ? "#d4380d" : "#389e0d",
            display: 'block',
            textAlign: 'center',
            marginBottom: 20
          }}>
            {formatTime(timeLeft)}
          </Text>

          {timeLeft < 300 && (
            <Alert
              message="Less than 5 minutes remaining!"
              type="warning"
              showIcon
              icon={<ExclamationCircleOutlined />}
            />
          )}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Title level={4} style={{ marginBottom: 15 }}>Question Navigation</Title>
          
          <div style={{ marginBottom: 15 }}>
            <Text strong>Progress: </Text>
            <Text>{answeredCount} of {questions.length} answered</Text>
          </div>

          <Pagination
            current={currentQuestion}
            total={questions.length}
            pageSize={1}
            onChange={(page) => setCurrentQuestion(page)}
            style={{ margin: "15px 0" }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {questions.map((_, index) => (
              <Button
                key={index + 1}
                type={currentQuestion === index + 1 ? "primary" : "default"}
                shape="circle"
                size="small"
                onClick={() => setCurrentQuestion(index + 1)}
                style={{
                  background: userAnswers[index + 1] ? '#52c41a' : 
                             currentQuestion === index + 1 ? '#1890ff' : 'transparent',
                  borderColor: userAnswers[index + 1] ? '#52c41a' : '#d9d9d9',
                  color: userAnswers[index + 1] ? 'white' : 'inherit'
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Divider />

          <Button
            type="primary"
            block
            size="large"
            onClick={handleSubmit}
            style={{ 
              height: 45,
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Submit Test
          </Button>

          {answeredCount < questions.length && (
            <Text style={{ 
              display: 'block', 
              textAlign: 'center', 
              marginTop: 10,
              color: '#d4380d',
              fontSize: 12
            }}>
              {questions.length - answeredCount} questions remaining
            </Text>
          )}
        </div>
      </Col>
    </Row>
  );
}