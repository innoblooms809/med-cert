"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Progress, Divider, Collapse, Tag, Statistic, Alert } from "antd";
import { useRouter } from "next/navigation";
import {
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  ReloadOutlined,
  StarOutlined,
  QuestionCircleOutlined,
  CodeOutlined
} from "@ant-design/icons";
import { TestQuestion, getQuestionTypeDisplay } from "@/utils/testData";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function ResultPage() {
  const [results, setResults] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedResults = sessionStorage.getItem('testResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/tests');
    }
  }, [router]);

  const handleRetake = () => {
    router.push('/tests/difficulty');
  };

  const handleHome = () => {
    router.push('/tests');
  };

  if (!results) {
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

  const { testInfo, score, totalQuestions, userAnswers, questions, timeSpent, autoSubmitted } = results;
  const percentage = Math.round((score / totalQuestions) * 100);
  const timeSpentMinutes = Math.round(timeSpent / 60);
  const incorrectAnswers = totalQuestions - score;

  const getPerformanceColor = (percent: number) => {
    if (percent >= 80) return "#52c41a";
    if (percent >= 60) return "#faad14";
    return "#f5222d";
  };

  const getPerformanceText = (percent: number) => {
    if (percent >= 80) return "Excellent!";
    if (percent >= 60) return "Good Job!";
    if (percent >= 40) return "Average";
    return "Needs Improvement";
  };

  const getQuestionStatus = (questionIndex: number) => {
    const userAnswer = userAnswers[questionIndex];
    const question = questions[questionIndex];
    
    if (!userAnswer) return { status: 'unattempted', color: 'default' };
    
    if (question.type === 'mcq') {
      const isCorrect = userAnswer.value === question.answer;
      return { 
        status: isCorrect ? 'correct' : 'incorrect', 
        color: isCorrect ? 'success' : 'error' 
      };
    }
    
    return { status: 'attempted', color: 'processing' };
  };

  const renderQuestionReview = (question: TestQuestion, index: number) => {
    const userAnswer = userAnswers[index];
    const status = getQuestionStatus(index);

    return (
      <Panel 
        key={index}
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              <strong>Question {index + 1}:</strong> {question.question}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag>{getQuestionTypeDisplay(question.type)}</Tag>
              <Tag color={status.color}>
                {status.status === 'correct' && '✓ Correct'}
                {status.status === 'incorrect' && '✗ Incorrect'}
                {status.status === 'attempted' && '✓ Attempted'}
                {status.status === 'unattempted' && '○ Unattempted'}
              </Tag>
            </div>
          </div>
        }
      >
        <div style={{ padding: '10px 0' }}>
          {/* User's Answer */}
          <div style={{ marginBottom: 15 }}>
            <strong>Your Answer:</strong>
            <div style={{ 
              background: '#f8f9fa', 
              padding: 12, 
              borderRadius: 6, 
              marginTop: 8,
              border: '1px solid #e9ecef'
            }}>
              {userAnswer ? (
                question.type === 'coding' ? (
                  <pre style={{ margin: 0, fontSize: '14px' }}>{userAnswer.value}</pre>
                ) : (
                  <Text>{userAnswer.value}</Text>
                )
              ) : (
                <Text type="secondary">Not attempted</Text>
              )}
            </div>
          </div>

          {/* Correct Answer (for MCQ) */}
          {question.type === 'mcq' && question.answer && (
            <div style={{ marginBottom: 15 }}>
              <strong>Correct Answer:</strong>
              <div style={{ 
                background: '#f6ffed', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #b7eb8f'
              }}>
                <Text>{question.answer}</Text>
              </div>
            </div>
          )}

          {/* Explanation */}
          {question.explanation && (
            <div style={{ marginBottom: 15 }}>
              <strong>Explanation:</strong>
              <div style={{ marginTop: 8 }}>
                <Text>{question.explanation}</Text>
              </div>
            </div>
          )}

          {/* Sample Solution for Coding */}
          {question.sampleSolution && (
            <div style={{ marginBottom: 15 }}>
              <strong>Sample Solution:</strong>
              <div style={{ 
                background: '#f0f5ff', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8 
              }}>
                <pre style={{ margin: 0, fontSize: '14px' }}>{question.sampleSolution}</pre>
              </div>
            </div>
          )}

          {/* Expected Output */}
          {question.expectedOutput && (
            <div style={{ marginBottom: 15 }}>
              <strong>Expected Output:</strong>
              <div style={{ 
                background: '#fff7e6', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8 
              }}>
                <pre style={{ margin: 0, fontSize: '14px' }}>{question.expectedOutput}</pre>
              </div>
            </div>
          )}

          {/* Ideal Solution for Scenario */}
          {question.idealSolution && (
            <div style={{ marginBottom: 15 }}>
              <strong>Ideal Solution Approach:</strong>
              <div style={{ marginTop: 8 }}>
                <Text>{question.idealSolution}</Text>
              </div>
            </div>
          )}

          {/* Key Considerations */}
          {question.keyConsiderations && (
            <div>
              <strong>Key Considerations:</strong>
              <ul style={{ marginTop: 8, marginBottom: 0 }}>
                {question.keyConsiderations.map((consideration: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: 4 }}>
                    <Text>{consideration}</Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Panel>
    );
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Card
          style={{
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            overflow: "hidden",
            marginBottom: 20
          }}
        >
          {/* Header */}
          <div style={{ 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px",
            textAlign: "center",
            color: "white"
          }}>
            <TrophyOutlined style={{ fontSize: 48, marginBottom: 20 }} />
            <Title level={2} style={{ color: "white", marginBottom: 10 }}>
              Test Completed!
            </Title>
            <Text style={{ color: "white", fontSize: 16, opacity: 0.9 }}>
              {testInfo.title} • {testInfo.domain}
            </Text>
            {autoSubmitted && (
              <Alert
                message="Test was auto-submitted when time expired"
                type="warning"
                style={{ marginTop: 15, background: 'rgba(255,255,255,0.2)', border: 'none' }}
              />
            )}
          </div>

          {/* Results Summary */}
          <div style={{ padding: "40px" }}>
            <Row gutter={32} style={{ marginBottom: 30 }}>
              <Col xs={24} md={8}>
                <Statistic
                  title="Your Score"
                  value={score}
                  suffix={`/ ${totalQuestions}`}
                  prefix={<StarOutlined />}
                  valueStyle={{ color: getPerformanceColor(percentage) }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="Percentage"
                  value={percentage}
                  suffix="%"
                  valueStyle={{ color: getPerformanceColor(percentage) }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="Time Spent"
                  value={timeSpentMinutes}
                  suffix="minutes"
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
            </Row>

            <Row gutter={32}>
              {/* Score Card */}
              <Col xs={24} md={12}>
                <Card 
                  style={{ 
                    textAlign: "center",
                    borderRadius: 12,
                    border: "2px solid #f0f0f0"
                  }}
                >
                  <div style={{ marginBottom: 24 }}>
                    <Progress
                      type="circle"
                      percent={percentage}
                      strokeColor={getPerformanceColor(percentage)}
                      size={120}
                      format={percent => (
                        <div>
                          <div style={{ fontSize: 24, fontWeight: "bold" }}>
                            {percent}%
                          </div>
                          <div style={{ fontSize: 12, color: "#666" }}>
                            Score
                          </div>
                        </div>
                      )}
                    />
                  </div>
                  
                  <Title level={3} style={{ color: getPerformanceColor(percentage) }}>
                    {getPerformanceText(percentage)}
                  </Title>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 15 }}>
                    <Tag color="success" style={{ fontSize: 14, padding: '4px 12px' }}>
                      <CheckCircleOutlined /> Correct: {score}
                    </Tag>
                    <Tag color="error" style={{ fontSize: 14, padding: '4px 12px' }}>
                      <CloseCircleOutlined /> Incorrect: {incorrectAnswers}
                    </Tag>
                  </div>
                </Card>
              </Col>

              {/* Details & Actions */}
              <Col xs={24} md={12}>
                <div style={{ marginBottom: 30 }}>
                  <Title level={4}>Test Summary</Title>
                  <Divider style={{ margin: "16px 0" }} />
                  
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 20, marginRight: 12 }} />
                    <Text style={{ fontSize: 16 }}>Correct Answers: <strong>{score}</strong></Text>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <CloseCircleOutlined style={{ color: "#f5222d", fontSize: 20, marginRight: 12 }} />
                    <Text style={{ fontSize: 16 }}>Incorrect Answers: <strong>{incorrectAnswers}</strong></Text>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                    <QuestionCircleOutlined style={{ color: "#faad14", fontSize: 20, marginRight: 12 }} />
                    <Text style={{ fontSize: 16 }}>Unattempted: <strong>{totalQuestions - Object.keys(userAnswers).length}</strong></Text>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ClockCircleOutlined style={{ color: "#1890ff", fontSize: 20, marginRight: 12 }} />
                    <Text style={{ fontSize: 16 }}>Time Spent: <strong>{timeSpentMinutes} min</strong></Text>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleRetake}
                    icon={<ReloadOutlined />}
                    style={{
                      height: 45,
                      fontSize: 16,
                      borderRadius: 8,
                    }}
                  >
                    Retake This Test
                  </Button>
                  
                  <Button
                    size="large"
                    onClick={handleHome}
                    icon={<HomeOutlined />}
                    style={{
                      height: 45,
                      fontSize: 16,
                      borderRadius: 8,
                    }}
                  >
                    Back to All Tests
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Detailed Question Review */}
            <Divider />
            <div style={{ marginTop: 30 }}>
              <Title level={3}>Detailed Question Review</Title>
              <Text style={{ color: "#666", fontSize: 16, display: 'block', marginBottom: 20 }}>
                Review your answers and learn from detailed explanations
              </Text>

              <Collapse accordion>
                {questions.map((question: TestQuestion, index: number) => 
                  renderQuestionReview(question, index)
                )}
              </Collapse>
            </div>

            {/* Performance Insights */}
            <Divider />
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Title level={4}>Performance Insights</Title>
              <Text style={{ color: "#666", fontSize: 16, display: 'block', marginBottom: 15 }}>
                {percentage >= 80 
                  ? "Outstanding performance! You have excellent knowledge in this domain."
                  : percentage >= 60
                  ? "Good performance! With a little more practice, you'll excel."
                  : "Keep practicing! Review the concepts and try again to improve your score."
                }
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                <Tag color="blue">Accuracy: {percentage}%</Tag>
                <Tag color="green">Correct: {score}</Tag>
                <Tag color="red">Incorrect: {incorrectAnswers}</Tag>
                <Tag color="orange">Time: {timeSpentMinutes}m</Tag>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}