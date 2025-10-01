"use client";

import { useState, useEffect } from "react";
import { Typography, Button, Input, Row, Col } from "antd";
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function InstructionsPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [testInfo, setTestInfo] = useState<any>(null);
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    // Get test info and difficulty from sessionStorage
    const storedTest = sessionStorage.getItem('currentTest');
    const storedDifficulty = sessionStorage.getItem('testDifficulty');
    
    if (storedTest) {
      setTestInfo(JSON.parse(storedTest));
    }
    if (storedDifficulty) {
      setDifficulty(storedDifficulty);
    }
  }, []);

  const handleStart = () => {
    if (inputValue.toLowerCase() === "start") {
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
                  Questions: <b>{testInfo.totalQuestions}</b>
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
                  Marks: <b>{testInfo.totalQuestions}</b>
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <SafetyOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Passing: <b>{Math.ceil(testInfo.totalQuestions * 0.6)} marks</b>
                </Text>
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
                  <span>{testInfo.totalQuestions} Multiple Choice Questions</span>
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
                  <Title level={5} style={{ marginBottom: 10 }}>Important Guidelines:</Title>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    <li>Do not close the browser window or tab during the test</li>
                    <li>The timer will not stop once you start the test</li>
                    <li>Use the question navigation to move between questions</li>
                    <li>All questions are mandatory</li>
                    <li>Test will auto-submit when time expires</li>
                    <li>No negative marking for wrong answers</li>
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