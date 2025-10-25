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
import CodeEditor from "@/components/CodeEditor";

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

  const renderCodeAnswer = (code: string, title: string, backgroundColor: string = '#f8f9fa') => {
    return (
      <div style={{ marginBottom: 15 }}>
        <strong>{title}:</strong>
        <div style={{ marginTop: 8 }}>
          <CodeEditor
            value={code}
            onChange={() => {}} // Read-only
            language="javascript"
            height="200px"
          />
        </div>
      </div>
    );
  };

  const renderSimpleCode = (code: string, title: string, backgroundColor: string = '#f8f9fa') => {
    return (
      <div style={{ marginBottom: 15 }}>
        <strong>{title}:</strong>
        <div style={{ 
          background: backgroundColor, 
          padding: 12, 
          borderRadius: 6, 
          marginTop: 8,
          border: '1px solid #e9ecef',
          fontFamily: 'monospace',
          fontSize: '14px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          {code}
        </div>
      </div>
    );
  };

  const renderQuestionReview = (question: TestQuestion, index: number) => {
    const userAnswer = userAnswers[index];
    const status = getQuestionStatus(index);

    return (
      <Panel 
        key={index}
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ flex: 1, minWidth: 300 }}>
              <strong>Question {index + 1}:</strong> {question.question}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
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
          <div style={{ marginBottom: 20 }}>
            <strong style={{ fontSize: '16px', color: '#1890ff' }}>Your Answer:</strong>
            {userAnswer ? (
              question.type === 'coding' ? (
                renderCodeAnswer(userAnswer.value, "Your Code Solution", '#f0f5ff')
              ) : question.type === 'theory' || question.type === 'scenario' ? (
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: 16, 
                  borderRadius: 6, 
                  marginTop: 8,
                  border: '1px solid #e9ecef',
                  lineHeight: 1.6
                }}>
                  <Text style={{ whiteSpace: 'pre-wrap' }}>{userAnswer.value}</Text>
                </div>
              ) : (
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: 12, 
                  borderRadius: 6, 
                  marginTop: 8,
                  border: '1px solid #e9ecef'
                }}>
                  <Text strong>{userAnswer.value}</Text>
                </div>
              )
            ) : (
              <div style={{ 
                background: '#fff2e8', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #ffbb96'
              }}>
                <Text type="secondary" style={{ color: '#d46b08' }}>
                  ❌ Not attempted
                </Text>
              </div>
            )}
          </div>

          <Divider style={{ margin: '20px 0' }} />

          {/* Correct Answer (for MCQ) */}
          {question.type === 'mcq' && question.answer && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#52c41a' }}>Correct Answer:</strong>
              <div style={{ 
                background: '#f6ffed', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #b7eb8f'
              }}>
                <Text strong style={{ color: '#389e0d' }}>{question.answer}</Text>
              </div>
            </div>
          )}

          {/* Explanation */}
          {question.explanation && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#1890ff' }}>Explanation:</strong>
              <div style={{ 
                background: '#f0f5ff', 
                padding: 16, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #d6e4ff',
                lineHeight: 1.6
              }}>
                <Text>{question.explanation}</Text>
              </div>
            </div>
          )}

          {/* Sample Solution for Coding */}
          {question.sampleSolution && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#389e0d' }}>💡 Sample Solution (For Reference):</strong>
              {question.type === 'coding' ? (
                renderCodeAnswer(question.sampleSolution, "", '#f6ffed')
              ) : (
                renderSimpleCode(question.sampleSolution, "", '#f6ffed')
              )}
            </div>
          )}

          {/* Expected Output */}
          {question.expectedOutput && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#fa8c16' }}>Expected Output:</strong>
              <div style={{ 
                background: '#fff7e6', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #ffd591'
              }}>
                <pre style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontFamily: 'monospace',
                  color: '#d46b08'
                }}>
                  {question.expectedOutput}
                </pre>
              </div>
            </div>
          )}

          {/* Ideal Solution for Scenario */}
          {question.idealSolution && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#722ed1' }}>Ideal Solution Approach:</strong>
              <div style={{ 
                background: '#f9f0ff', 
                padding: 16, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #d3adf7',
                lineHeight: 1.6
              }}>
                <Text style={{ whiteSpace: 'pre-wrap' }}>{question.idealSolution}</Text>
              </div>
            </div>
          )}

          {/* Key Considerations */}
          {question.keyConsiderations && (
            <div style={{ marginBottom: 15 }}>
              <strong style={{ fontSize: '16px', color: '#13c2c2' }}>Key Considerations:</strong>
              <ul style={{ 
                marginTop: 8, 
                marginBottom: 0,
                paddingLeft: 20 
              }}>
                {question.keyConsiderations.map((consideration: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: 8, lineHeight: 1.5 }}>
                    <Text>{consideration}</Text>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Input/Output for Coding Questions */}
          {question.inputOutput && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#1890ff' }}>Input/Output Requirements:</strong>
              <div style={{ 
                background: '#e6f7ff', 
                padding: 16, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #91d5ff',
                lineHeight: 1.6
              }}>
                <Text>{question.inputOutput}</Text>
              </div>
            </div>
          )}

          {/* Solution Approach for Coding Questions */}
          {question.solutionApproach && (
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: '16px', color: '#fa8c16' }}>Solution Approach:</strong>
              <div style={{ 
                background: '#fff7e6', 
                padding: 16, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #ffd591',
                lineHeight: 1.6
              }}>
                <Text>{question.solutionApproach}</Text>
              </div>
            </div>
          )}

          {/* Complexity for Coding Questions */}
          {question.complexity && (
            <div style={{ marginBottom: 15 }}>
              <strong style={{ fontSize: '16px', color: '#52c41a' }}>Complexity Analysis:</strong>
              <div style={{ 
                background: '#f6ffed', 
                padding: 12, 
                borderRadius: 6, 
                marginTop: 8,
                border: '1px solid #b7eb8f'
              }}>
                <Text strong style={{ color: '#389e0d' }}>{question.complexity}</Text>
              </div>
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
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 15, flexWrap: 'wrap' }}>
                    <Tag color="success" style={{ fontSize: 14, padding: '4px 12px' }}>
                      <CheckCircleOutlined /> Correct: {score}
                    </Tag>
                    <Tag color="error" style={{ fontSize: 14, padding: '4px 12px' }}>
                      <CloseCircleOutlined /> Incorrect: {incorrectAnswers}
                    </Tag>
                    <Tag color="processing" style={{ fontSize: 14, padding: '4px 12px' }}>
                      <QuestionCircleOutlined /> Unattempted: {totalQuestions - Object.keys(userAnswers).length}
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

              <Collapse 
                accordion 
                style={{ 
                  background: 'transparent',
                  border: '1px solid #e8e8e8'
                }}
              >
                {questions.map((question: TestQuestion, index: number) => 
                  renderQuestionReview(question, index)
                )}
              </Collapse>
            </div>

            {/* Performance Insights */}
            <Divider />
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Title level={4}>Performance Insights</Title>
              <Text style={{ color: "#666", fontSize: 16, display: 'block', marginBottom: 15, lineHeight: 1.6 }}>
                {percentage >= 80 
                  ? "🎉 Outstanding performance! You have excellent knowledge in this domain. Keep up the great work!"
                  : percentage >= 60
                  ? "👍 Good performance! With a little more practice, you'll excel in this domain."
                  : "📚 Keep practicing! Review the concepts and try again to improve your score. You're on the right track!"
                }
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                <Tag color="blue" style={{ fontSize: 14, padding: '6px 12px' }}>Accuracy: {percentage}%</Tag>
                <Tag color="green" style={{ fontSize: 14, padding: '6px 12px' }}>Correct: {score}</Tag>
                <Tag color="red" style={{ fontSize: 14, padding: '6px 12px' }}>Incorrect: {incorrectAnswers}</Tag>
                <Tag color="orange" style={{ fontSize: 14, padding: '6px 12px' }}>Time: {timeSpentMinutes}m</Tag>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}