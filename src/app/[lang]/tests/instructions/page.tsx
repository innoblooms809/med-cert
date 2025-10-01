"use client";

import { useState, useEffect } from "react";
import { Typography, Button, Input, Row, Col, Tag, Divider } from "antd";
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { TestQuestion, getQuestionTypeDisplay, filterQuestionsByDifficulty } from "@/utils/testData";

const { Title, Text } = Typography;

export default function InstructionsPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [testInfo, setTestInfo] = useState<any>(null);
  const [difficulty, setDifficulty] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<TestQuestion[]>([]);

  useEffect(() => {
    const storedTest = sessionStorage.getItem('currentTest');
    const storedDifficulty = sessionStorage.getItem('testDifficulty');
    
    if (storedTest) {
      const test = JSON.parse(storedTest);
      setTestInfo(test);
      
      if (storedDifficulty) {
        setDifficulty(storedDifficulty);
        const filtered = filterQuestionsByDifficulty(test.questions, storedDifficulty);
        setFilteredQuestions(filtered);
      } else {
        setFilteredQuestions(test.questions);
        setDifficulty('all');
      }
    }
  }, []);

  const handleStart = () => {
    if (inputValue.toLowerCase() === "start") {
      // Store filtered questions for the exam
      sessionStorage.setItem('examQuestions', JSON.stringify(filteredQuestions));
      router.push("/tests/exam");
    }
  };

  if (!testInfo) {
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

  const questionTypeCounts = filteredQuestions.reduce((acc: any, question) => {
    acc[question.type] = (acc[question.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, width: "100%" }}>
        <Row gutter={60} align="top">
          {/* LEFT SIDE */}
          <Col xs={24} md={10}>
            <div>
              <Title level={2} style={{ marginBottom: 10 }}>
                {testInfo.title}
              </Title>
              <Text style={{ color: "#666", fontSize: 16, marginBottom: 20, display: "block" }}>
                {testInfo.domain} • {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
              </Text>
              
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <QuestionCircleOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Questions: <b>{filteredQuestions.length}</b>
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <ClockCircleOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Duration: <b>{testInfo.duration} minutes</b>
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <FileTextOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Marks: <b>{filteredQuestions.length}</b>
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <SafetyOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Passing: <b>{Math.ceil(filteredQuestions.length * 0.6)} marks</b>
                </Text>
              </div>

              {/* Question Type Breakdown */}
              <Divider />
              <Title level={5}>Question Types:</Title>
              <div style={{ marginTop: 10 }}>
                {Object.entries(questionTypeCounts).map(([type, count]) => (
                  <div key={type} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: 8,
                    padding: '4px 0'
                  }}>
                    <Text>{getQuestionTypeDisplay(type)}</Text>
                    <Tag>{count as number}</Tag>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col xs={24} md={14}>
            <div>
              <Title level={4} style={{ marginBottom: 20 }}>
                <BulbOutlined style={{ marginRight: 10, color: "#faad14" }} /> Test Instructions
              </Title>

              <div style={{ lineHeight: 1.9, fontSize: 16, color: "#333", marginBottom: 30 }}>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontWeight: 'bold', minWidth: '200px' }}>Assessment Duration:</span>
                  <span>{testInfo.duration}:00 minutes (hh:mm:ss)</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontWeight: 'bold', minWidth: '200px' }}>Total Questions:</span>
                  <span>{filteredQuestions.length} Mixed Format Questions</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontWeight: 'bold', minWidth: '200px' }}>Difficulty Level:</span>
                  <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                </p>
                <p style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontWeight: 'bold', minWidth: '200px' }}>Marking Scheme:</span>
                  <span>+1 for correct answer, 0 for incorrect/unattempted</span>
                </p>
                
                <div style={{ marginTop: 20 }}>
                  <Title level={5} style={{ marginBottom: 10 }}>Question Formats:</Title>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    <li><strong>Coding:</strong> Write code solutions with explanations</li>
                    <li><strong>Multiple Choice:</strong> Select the correct answer</li>
                    <li><strong>Theory:</strong> Explain concepts in your own words</li>
                    <li><strong>Output Prediction:</strong> Predict code output</li>
                    <li><strong>Scenario Based:</strong> Solve real-world problems</li>
                  </ul>
                </div>

                <div style={{ marginTop: 20 }}>
                  <Title level={5} style={{ marginBottom: 10 }}>Important Guidelines:</Title>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    <li>Do not close the browser window or tab during the test</li>
                    <li>The timer will not stop once you start the test</li>
                    <li>Use the question navigation to move between questions</li>
                    <li>All questions are mandatory</li>
                    <li>Test will auto-submit when time expires</li>
                    <li>No negative marking for wrong answers</li>
                    <li>For coding questions, focus on both correctness and approach</li>
                  </ul>
                </div>
              </div>

              {/* START SECTION */}
              <div style={{ marginTop: 30 }}>
                <Text strong style={{ display: 'block', marginBottom: 10, fontSize: 16 }}>
                  Type "start" in the box below to begin your test
                </Text>
                <div style={{ display: "flex" }}>
                  <Input
                    placeholder='Type "start" to Begin Test'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ flex: 1, height: 45, fontSize: 16, borderRadius: "8px 0 0 8px" }}
                  />
                  <Button
                    type="primary"
                    size="large"
                    disabled={inputValue.toLowerCase() !== "start"}
                    onClick={handleStart}
                    style={{
                      height: 45,
                      fontSize: 16,
                      borderRadius: "0 8px 8px 0",
                    }}
                  >
                    Start Test →
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}