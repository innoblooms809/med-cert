"use client";

import { useState, useEffect, useRef } from "react";
import { Typography, Radio, Button, Pagination, Row, Col, Divider, Alert, Input, Card, Tag, Progress, Modal, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import { ClockCircleOutlined, ExclamationCircleOutlined, CodeOutlined, CloseOutlined, FastForwardOutlined, WarningOutlined } from "@ant-design/icons";
import { TestQuestion, getQuestionTypeDisplay } from "@/utils/testData";
import CodeEditor from "@/components/CodeEditor";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { CheckableTag } = Tag;

// Question type timing configuration (in seconds)
const QUESTION_TIMINGS: Record<string, { min: number, max: number, recommended: number }> = {
  'mcq': { min: 20, max: 30, recommended: 25 },
  'theory': { min: 60, max: 180, recommended: 120 },
  'output': { min: 30, max: 60, recommended: 45 },
  'scenario': { min: 120, max: 300, recommended: 180 },
  'coding': { min: 300, max: 420, recommended: 360 }
};

// Define QuestionStatus as a union type
const QuestionStatusValues = ['answered', 'unanswered', 'skipped', 'timed-out'] as const;
type QuestionStatus = typeof QuestionStatusValues[number];

// Define UserAnswer type
type UserAnswer = {
  type: 'text' | 'code' | 'mcq';
  value: string | string[];
};

export default function ExamPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswer>>({});
  const [questionTimeSpent, setQuestionTimeSpent] = useState<Record<number, number>>({});
  const [questionStatus, setQuestionStatus] = useState<Record<number, QuestionStatus>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const questionStartTimeRef = useRef<number>(Date.now());
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
      
      // Load saved answers
      const savedAnswers = sessionStorage.getItem('userAnswers');
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        setUserAnswers(parsedAnswers);
        
        // Count answered questions
        let count = 0;
        Object.values(parsedAnswers).forEach((answer: any) => {
          if (answer?.value && 
              ((typeof answer.value === 'string' && answer.value.trim().length > 0) ||
               (Array.isArray(answer.value) && answer.value.length > 0))) {
            count++;
          }
        });
        setAnsweredCount(count);
      }

      // Load saved question times
      const savedTimes = sessionStorage.getItem('questionTimes');
      if (savedTimes) {
        setQuestionTimeSpent(JSON.parse(savedTimes));
      }

      // Load saved question status with proper type casting
      const savedStatus = sessionStorage.getItem('questionStatus');
      if (savedStatus) {
        try {
          const parsedStatus = JSON.parse(savedStatus);
          // Validate and cast to Record<number, QuestionStatus>
          const validatedStatus: Record<number, QuestionStatus> = {};
          Object.entries(parsedStatus).forEach(([key, value]) => {
            const index = parseInt(key);
            if (QuestionStatusValues.includes(value as QuestionStatus)) {
              validatedStatus[index] = value as QuestionStatus;
            } else {
              validatedStatus[index] = 'unanswered';
            }
          });
          setQuestionStatus(validatedStatus);
        } catch (error) {
          // If parsing fails, initialize with default status
          initializeQuestionStatus(examQuestions);
        }
      } else {
        initializeQuestionStatus(examQuestions);
      }
    } else {
      router.push('/tests');
    }
  }, [router]);

  const initializeQuestionStatus = (examQuestions: TestQuestion[]) => {
    const initialStatus: Record<number, QuestionStatus> = {};
    examQuestions.forEach((_: any, index: number) => {
      initialStatus[index] = 'unanswered';
    });
    setQuestionStatus(initialStatus);
    sessionStorage.setItem('questionStatus', JSON.stringify(initialStatus));
  };

  // Main timer for total test time
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

  // Question timer - track time spent on current question
  useEffect(() => {
    questionStartTimeRef.current = Date.now();

    const questionTimer = setInterval(() => {
      const timeSpentOnThisVisit = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
      
      // Don't update time for timed-out or answered questions
      if (questionStatus[currentQuestionIndex] === 'timed-out' || 
          questionStatus[currentQuestionIndex] === 'answered') {
        return;
      }

      const totalTimeSpent = (questionTimeSpent[currentQuestionIndex] || 0) + timeSpentOnThisVisit;
      
      const newTimes = {
        ...questionTimeSpent,
        [currentQuestionIndex]: totalTimeSpent
      };
      
      setQuestionTimeSpent(newTimes);
      sessionStorage.setItem('questionTimes', JSON.stringify(newTimes));

      // Auto mark as timed-out when time completes
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion && questionStatus[currentQuestionIndex] === 'unanswered') {
        const questionTiming = getQuestionTimingInfo(currentQuestion.type);
        if (totalTimeSpent >= questionTiming.recommended) {
          // Mark as timed-out with proper type
          const newStatus: Record<number, QuestionStatus> = {
            ...questionStatus,
            [currentQuestionIndex]: 'timed-out'
          };
          setQuestionStatus(newStatus);
          sessionStorage.setItem('questionStatus', JSON.stringify(newStatus));
          
          // Auto move to next question if not last
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
          }
        }
      }
    }, 1000);

    return () => clearInterval(questionTimer);
  }, [currentQuestionIndex, questions, questionStatus]);

  const handleAnswerSelect = (answer: UserAnswer) => {
    const newAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: answer
    };
    
    setUserAnswers(newAnswers);
    
    // Update question status to answered with proper type
    const newStatus: Record<number, QuestionStatus> = {
      ...questionStatus,
      [currentQuestionIndex]: 'answered'
    };
    setQuestionStatus(newStatus);
    sessionStorage.setItem('questionStatus', JSON.stringify(newStatus));
    
    // Update answered count
    let count = 0;
    Object.values(newAnswers).forEach((ans: UserAnswer) => {
      if (ans?.value && 
          ((typeof ans.value === 'string' && ans.value.trim().length > 0) ||
           (Array.isArray(ans.value) && ans.value.length > 0))) {
        count++;
      }
    });
    setAnsweredCount(count);
    
    sessionStorage.setItem('userAnswers', JSON.stringify(newAnswers));
  };

  const handleTextAnswer = (text: string) => {
    handleAnswerSelect({ type: 'text', value: text });
  };

  const handleCodeAnswer = (code: string) => {
    handleAnswerSelect({ type: 'code', value: code });
  };

  const handleMcqAnswer = (value: string | string[]) => {
    handleAnswerSelect({ type: 'mcq', value });
  };

  const handleMultiSelectAnswer = (selected: string[], option: string) => {
    const currentValue = userAnswers[currentQuestionIndex]?.value || [];
    let newValue: string[];
    
    if (selected.includes(option)) {
      newValue = [...(currentValue as string[]), option];
    } else {
      newValue = (currentValue as string[]).filter((item: string) => item !== option);
    }
    
    handleMcqAnswer(newValue);
  };

  const handleSkipQuestion = () => {
    // Mark current question as skipped with proper type
    const newStatus: Record<number, QuestionStatus> = {
      ...questionStatus,
      [currentQuestionIndex]: 'skipped'
    };
    setQuestionStatus(newStatus);
    sessionStorage.setItem('questionStatus', JSON.stringify(newStatus));
    
    // Move to next question if not last
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleUnskipQuestion = () => {
    // Change from skipped back to unanswered with proper type
    const newStatus: Record<number, QuestionStatus> = {
      ...questionStatus,
      [currentQuestionIndex]: 'unanswered'
    };
    setQuestionStatus(newStatus);
    sessionStorage.setItem('questionStatus', JSON.stringify(newStatus));
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
      if (!userAnswer?.value) return;
      
      if (question.type === 'mcq') {
        if (typeof userAnswer.value === 'string') {
          if (userAnswer.value === question.answer) {
            correct++;
          }
        }
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
      questionTimeSpent,
      questionStatus,
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
      questionTimeSpent,
      questionStatus,
      questions,
      timeSpent: testInfo.duration * 60,
      submittedAt: new Date().toISOString(),
      autoSubmitted: true
    };
    sessionStorage.setItem('testResults', JSON.stringify(results));
    router.push("/tests/result");
  };

  const getQuestionTimingInfo = (questionType: string) => {
    return QUESTION_TIMINGS[questionType] || QUESTION_TIMINGS.mcq;
  };

  const getTimeProgressPercent = (questionType: string, timeSpent: number) => {
    const timing = getQuestionTimingInfo(questionType);
    return Math.min(100, (timeSpent / timing.recommended) * 100);
  };

  const getTimeColor = (questionType: string, timeSpent: number) => {
    const timing = getQuestionTimingInfo(questionType);
    const progressPercent = (timeSpent / timing.recommended) * 100;
    
    if (progressPercent < 50) return '#52c41a'; // Green
    if (progressPercent < 80) return '#faad14'; // Orange
    return '#f5222d'; // Red
  };

  const getButtonColor = (index: number) => {
    const status = questionStatus[index];
    
    if (currentQuestionIndex === index) return '#1890ff'; // Blue for current
    if (status === 'answered') return '#52c41a'; // Green for answered
    if (status === 'skipped' || status === 'timed-out') return '#f5222d'; // Red for skipped/timed-out
    return 'transparent'; // White for unanswered
  };

  const getButtonTextColor = (index: number) => {
    const status = questionStatus[index];
    if (status === 'skipped' || status === 'timed-out' || status === 'answered') {
      return 'white';
    }
    if (currentQuestionIndex === index) {
      return 'white';
    }
    return 'inherit';
  };

  const renderQuestionContent = (question: TestQuestion) => {
    const currentAnswer = userAnswers[currentQuestionIndex];
    const status = questionStatus[currentQuestionIndex];
    const timeSpent = questionTimeSpent[currentQuestionIndex] || 0;

    // Check if this is a multi-select MCQ
    const isMultiSelect = question.type === 'mcq' && 
                         question.answer && 
                         typeof question.answer === 'string' && 
                         question.answer.includes(',');

    // Check if question is timed-out (user cannot answer)
    const isTimedOut = status === 'timed-out';

    return (
      <div>
        {status === 'skipped' && (
          <Alert
            message="This question was skipped"
            description="You can still answer this question. Click 'Unskip Question' below to enable answering."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
            action={
              <Button size="small" type="primary" onClick={handleUnskipQuestion}>
                Unskip Question
              </Button>
            }
          />
        )}

        {isTimedOut && (
          <Alert
            message="Time's up for this question!"
            description="You cannot answer this question as the time has expired. Please proceed to the next question."
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        {question.type === 'mcq' ? (
          isMultiSelect ? (
            // Multi-select Checkbox style
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {question.options?.map((opt: string, index: number) => (
                <CheckableTag
                  key={index}
                  checked={((currentAnswer?.value as string[]) || []).includes(opt)}
                  onChange={(checked) => {
                    if (!isTimedOut) {
                      const currentValues = (currentAnswer?.value as string[]) || [];
                      if (checked) {
                        handleMultiSelectAnswer([...currentValues, opt], opt);
                      } else {
                        handleMultiSelectAnswer(
                          currentValues.filter((item: string) => item !== opt), 
                          opt
                        );
                      }
                    }
                  }}
                  style={{
                    padding: "16px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    transition: "all 0.3s",
                    fontSize: "16px",
                    margin: 0,
                    background: ((currentAnswer?.value as string[]) || []).includes(opt) ? '#e6f7ff' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: isTimedOut ? 0.6 : 1,
                    cursor: isTimedOut ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Checkbox
                    checked={((currentAnswer?.value as string[]) || []).includes(opt)}
                    disabled={isTimedOut}
                    style={{ marginRight: 8 }}
                  />
                  {opt}
                </CheckableTag>
              ))}
            </div>
          ) : (
            // Single select Radio style
            <Radio.Group
              onChange={(e) => !isTimedOut && handleMcqAnswer(e.target.value)}
              value={currentAnswer?.value as string}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {question.options?.map((opt: string, index: number) => (
                <Radio
                  key={index}
                  value={opt}
                  disabled={isTimedOut}
                  style={{
                    padding: "16px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "8px",
                    transition: "all 0.3s",
                    fontSize: "16px",
                    margin: 0,
                    background: currentAnswer?.value === opt ? '#e6f7ff' : 'transparent',
                    opacity: isTimedOut ? 0.6 : 1
                  }}
                >
                  {opt}
                </Radio>
              ))}
            </Radio.Group>
          )
        ) : question.type === 'coding' ? (
          <div>
            {question.inputOutput && (
              <Card size="small" style={{ marginBottom: 16, background: '#f0f5ff' }}>
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
            <div style={{ marginBottom: 16 }}>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>
                Write your code solution below:
              </Text>
              <CodeEditor
                value={(currentAnswer?.value as string) || ''}
                onChange={isTimedOut ? () => {} : handleCodeAnswer}
                language="javascript"
                height="300px"
              />
              {isTimedOut && (
                <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
                  <WarningOutlined /> This question is locked as time has expired.
                </Text>
              )}
            </div>
          </div>
        ) : question.type === 'theory' ? (
          <div>
            <TextArea
              placeholder={isTimedOut ? "Time expired - Cannot answer" : "Write your explanation here..."}
              value={(currentAnswer?.value as string) || ''}
              onChange={(e) => !isTimedOut && handleTextAnswer(e.target.value)}
              rows={8}
              style={{ fontSize: '16px' }}
              disabled={isTimedOut}
            />
            {isTimedOut && (
              <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
                <WarningOutlined /> Time expired for this question
              </Text>
            )}
          </div>
        ) : question.type === 'output' ? (
          <div>
            {question.code && (
              <Card size="small" style={{ marginBottom: 16, background: '#f6ffed' }}>
                <pre style={{ margin: 0, fontSize: '14px', fontFamily: 'monospace' }}>
                  {question.code}
                </pre>
              </Card>
            )}
            <Input
              placeholder={isTimedOut ? "Time expired - Cannot answer" : "What will be the output?"}
              value={(currentAnswer?.value as string) || ''}
              onChange={(e) => !isTimedOut && handleTextAnswer(e.target.value)}
              style={{ fontSize: '16px' }}
              disabled={isTimedOut}
            />
          </div>
        ) : question.type === 'scenario' ? (
          <div>
            {question.idealSolution && (
              <Card size="small" style={{ marginBottom: 16, background: '#fff0f6' }}>
                <Text strong>Considerations: </Text>
                <Text>{question.idealSolution}</Text>
              </Card>
            )}
            <TextArea
              placeholder={isTimedOut ? "Time expired - Cannot answer" : "Describe your approach and solution..."}
              value={(currentAnswer?.value as string) || ''}
              onChange={(e) => !isTimedOut && handleTextAnswer(e.target.value)}
              rows={8}
              style={{ fontSize: '16px' }}
              disabled={isTimedOut}
            />
          </div>
        ) : (
          <Text>Unsupported question type</Text>
        )}
      </div>
    );
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
  const currentAnswer = userAnswers[currentQuestionIndex];
  const currentStatus = questionStatus[currentQuestionIndex];
  const isAnswered = currentStatus === 'answered';
  const isSkipped = currentStatus === 'skipped';
  const isTimedOut = currentStatus === 'timed-out';
  const timeSpent = questionTimeSpent[currentQuestionIndex] || 0;
  const questionTiming = getQuestionTimingInfo(currentQuestion.type);
  
  // For answered/timed-out questions, show time spent when status changed
  const displayTimeSpent = isAnswered || isTimedOut ? Math.min(timeSpent, questionTiming.recommended) : timeSpent;
  const timeProgressPercent = getTimeProgressPercent(currentQuestion.type, displayTimeSpent);
  const timeColor = getTimeColor(currentQuestion.type, displayTimeSpent);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <>
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
              {isAnswered && (
                <Tag color="success">
                  Answered
                </Tag>
              )}
              {isSkipped && (
                <Tag color="warning">
                  Skipped
                </Tag>
              )}
              {isTimedOut && (
                <Tag color="error">
                  Time's Up
                </Tag>
              )}
            </div>
            <Text style={{ fontSize: 16, color: "#666", lineHeight: 1.6 }}>
              {currentQuestion.question}
            </Text>
          </div>

          {/* Question Time Progress */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text strong>Time on this question:</Text>
              <Text style={{ color: timeColor, fontWeight: 'bold' }}>
                {formatTime(displayTimeSpent)} / {formatTime(questionTiming.recommended)}
                {isAnswered && (
                  <span style={{ color: '#52c41a', marginLeft: 8 }}>
                    (Answered)
                  </span>
                )}
                {isTimedOut && (
                  <span style={{ color: '#f5222d', marginLeft: 8 }}>
                    (Time's Up)
                  </span>
                )}
              </Text>
            </div>
            <Progress 
              percent={timeProgressPercent} 
              strokeColor={timeColor}
              showInfo={false}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Recommended: {questionTiming.min}-{questionTiming.max} seconds
              {!isAnswered && !isTimedOut && displayTimeSpent >= questionTiming.recommended && !isLastQuestion && (
                <span style={{ color: '#f5222d', fontWeight: 'bold', marginLeft: 8 }}>
                  • Auto-moving to next question...
                </span>
              )}
            </Text>
          </div>

          {renderQuestionContent(currentQuestion)}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {currentQuestionIndex > 0 && (
                <Button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}>
                  Previous
                </Button>
              )}
              {!isAnswered && !isTimedOut && !isSkipped && !isLastQuestion && (
                <Button 
                  type="default" 
                  danger 
                  icon={<FastForwardOutlined />}
                  onClick={handleSkipQuestion}
                >
                  Skip Question
                </Button>
              )}
            </div>
            <div>
              {!isLastQuestion ? (
                <Button 
                  type="primary"
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="default"
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                >
                  Next
                </Button>
              )}
            </div>
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
              <Title level={4} style={{ margin: 0 }}>Total Time Remaining</Title>
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

            {timeLeft < 300 && timeLeft > 0 && (
              <Alert
                message="Less than 5 minutes remaining!"
                type="warning"
                showIcon
                icon={<ExclamationCircleOutlined />}
              />
            )}
            {timeLeft === 0 && (
              <Alert
                message="Time's up! Submitting your test..."
                type="error"
                showIcon
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
              <Text style={{ color: '#faad14', marginLeft: 10 }}>
                ({questions.length - answeredCount} remaining)
              </Text>
            </div>

            <Pagination
              current={currentQuestionIndex + 1}
              total={questions.length}
              pageSize={1}
              onChange={(page) => setCurrentQuestionIndex(page - 1)}
              style={{ margin: "15px 0" }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, marginLeft: "70px" }}>
              {questions.map((question, index) => {
                const buttonColor = getButtonColor(index);
                const textColor = getButtonTextColor(index);
                const status = questionStatus[index];
                
                return (
                  <Button
                    key={index}
                    type={currentQuestionIndex === index ? "primary" : "default"}
                    shape="circle"
                    size="small"
                    onClick={() => {
                      if (questionStatus[currentQuestionIndex] !== 'timed-out') {
                        setCurrentQuestionIndex(index);
                      }
                    }}
                    style={{
                      background: buttonColor,
                      borderColor: buttonColor === 'transparent' ? '#d9d9d9' : buttonColor,
                      color: textColor,
                      fontWeight: status === 'skipped' || status === 'timed-out' ? 'bold' : 'normal'
                    }}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>

            

            <Divider />

            <Button
              type="primary"
              block
              size="large"
              onClick={() => setShowSubmitModal(true)}
              style={{ 
                height: 45,
                fontSize: 16,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #2261f5ff, #2073faff)',
                border: 'none'
              }}
            >
              Submit Test
            </Button>

            {answeredCount < questions.length && (
              <Text style={{ 
                display: 'block', 
                textAlign: 'center', 
                marginTop: 10,
                color: '#faad14',
                fontSize: 12
              }}>
                {questions.length - answeredCount} questions remaining
              </Text>
            )}
          </div>
        </Col>
      </Row>

      {/* Submit Confirmation Modal */}
      <Modal
        title="Submit Test"
        open={showSubmitModal}
        onOk={handleSubmit}
        onCancel={() => setShowSubmitModal(false)}
        okText="Yes, Submit Now"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <div style={{ padding: '20px 0' }}>
          <Alert
            message="Are you sure you want to submit your test?"
            description={
              <div>
                <p>Once submitted, you cannot make any changes.</p>
                <div style={{ marginTop: 10 }}>
                  <p><strong>Test Summary:</strong></p>
                  <p>• Questions Answered: {answeredCount} / {questions.length}</p>
                  <p>• Questions Remaining: {questions.length - answeredCount}</p>
                  <p>• Time Remaining: {formatTime(timeLeft)}</p>
                </div>
              </div>
            }
            type="warning"
            showIcon
          />
          {answeredCount < questions.length && (
            <Alert
              message="You have unanswered questions!"
              description={`You have ${questions.length - answeredCount} question(s) remaining. They will be marked as unattempted.`}
              type="error"
              showIcon
              style={{ marginTop: 15 }}
            />
          )}
        </div>
      </Modal>
    </>
  );
}