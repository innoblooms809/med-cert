"use client";

import { useState, useEffect } from "react";
import { Typography, Radio, Button, Pagination, Row, Col, Divider, Alert, Input, Card, Tag } from "antd";
import { useRouter } from "next/navigation";
import { ClockCircleOutlined, ExclamationCircleOutlined, CodeOutlined } from "@ant-design/icons";
import { TestQuestion, getQuestionTypeDisplay } from "@/utils/testData";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function ExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedTest = sessionStorage.getItem('currentTest');
    const storedQuestions = sessionStorage.getItem('examQuestions');
    
    if (storedTest && storedQuestions) {
      const test = JSON.parse(storedTest);
      const examQuestions = JSON.parse(storedQuestions);
      setTestInfo(test);
      setTimeLeft(test.duration * 60);
      setQuestions(examQuestions);
      
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

  const handleAnswerSelect = (answer: any) => {
    const newAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: answer
    };
    setUserAnswers(newAnswers);
    setAnsweredCount(Object.keys(newAnswers).length);
    sessionStorage.setItem('userAnswers', JSON.stringify(newAnswers));
  };

  const handleTextAnswer = (text: string) => {
    handleAnswerSelect({ type: 'text', value: text });
  };

  const handleCodeAnswer = (code: string) => {
    handleAnswerSelect({ type: 'code', value: code });
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
      const userAnswer = userAnswers[index];
      if (question.type === 'mcq' && userAnswer?.value === question.answer) {
        correct++;
      }
      // For other question types, we'd need more complex scoring logic
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

  const renderQuestionContent = (question: TestQuestion) => {
    const currentAnswer = userAnswers[currentQuestionIndex];

    switch (question.type) {
      case 'mcq':
        return (
          <Radio.Group
            onChange={(e) => handleAnswerSelect({ type: 'mcq', value: e.target.value })}
            value={currentAnswer?.value}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {question.options?.map((opt: string, index: number) => (
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
        );

      case 'coding':
        return (
          <div>
            {question.inputOutput && (
              <Card size="small" style={{ marginBottom: 16, background: '#f8f9fa' }}>
                <Text strong>Input/Output: </Text>
                <Text>{question.inputOutput}</Text>
              </Card>
            )}
            {question.solutionApproach && (
              <Card size="small" style={{ marginBottom: 16, background: '#fff7e6' }}>
                <Text strong>Solution Approach: </Text>
                <Text>{question.solutionApproach}</Text>
              </Card>
            )}
            <TextArea
              placeholder="Write your code solution here..."
              value={currentAnswer?.value || ''}
              onChange={(e) => handleCodeAnswer(e.target.value)}
              rows={12}
              style={{ 
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            />
          </div>
        );

      case 'theory':
        return (
          <TextArea
            placeholder="Write your explanation here..."
            value={currentAnswer?.value || ''}
            onChange={(e) => handleTextAnswer(e.target.value)}
            rows={8}
            style={{ fontSize: '16px' }}
          />
        );

      case 'output':
        return (
          <div>
            {question.code && (
              <Card size="small" style={{ marginBottom: 16, background: '#f0f5ff' }}>
                <pre style={{ margin: 0, fontSize: '14px', fontFamily: 'monospace' }}>
                  {question.code}
                </pre>
              </Card>
            )}
            <Input
              placeholder="What will be the output?"
              value={currentAnswer?.value || ''}
              onChange={(e) => handleTextAnswer(e.target.value)}
              style={{ fontSize: '16px' }}
            />
          </div>
        );

      case 'scenario':
        return (
          <div>
            {question.idealSolution && (
              <Card size="small" style={{ marginBottom: 16, background: '#f6ffed' }}>
                <Text strong>Considerations: </Text>
                <Text>{question.idealSolution}</Text>
              </Card>
            )}
            <TextArea
              placeholder="Describe your approach and solution..."
              value={currentAnswer?.value || ''}
              onChange={(e) => handleTextAnswer(e.target.value)}
              rows={8}
              style={{ fontSize: '16px' }}
            />
          </div>
        );

      default:
        return <Text>Unsupported question type</Text>;
    }
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

  const currentQuestion = questions[currentQuestionIndex];

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Title level={3} style={{ margin: 0 }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Title>
            <Tag color={
              currentQuestion.difficulty === 'easy' ? 'green' : 
              currentQuestion.difficulty === 'medium' ? 'orange' : 'red'
            }>
              {currentQuestion.difficulty}
            </Tag>
            <Tag icon={<CodeOutlined />}>
              {getQuestionTypeDisplay(currentQuestion.type)}
            </Tag>
          </div>
          <Text style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
            {currentQuestion.question}
          </Text>
        </div>

        {renderQuestionContent(currentQuestion)}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <Button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
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
            current={currentQuestionIndex + 1}
            total={questions.length}
            pageSize={1}
            onChange={(page) => setCurrentQuestionIndex(page - 1)}
            style={{ margin: "15px 0" }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {questions.map((question, index) => (
              <Button
                key={index}
                type={currentQuestionIndex === index ? "primary" : "default"}
                shape="circle"
                size="small"
                onClick={() => setCurrentQuestionIndex(index)}
                style={{
                  background: userAnswers[index] ? '#52c41a' : 
                             currentQuestionIndex === index ? '#1890ff' : 'transparent',
                  borderColor: userAnswers[index] ? '#52c41a' : '#d9d9d9',
                  color: userAnswers[index] ? 'white' : 'inherit'
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