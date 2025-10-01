"use client";

import { useState, useEffect } from "react";
import { Typography, Button, Card, Tag, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import {
  ThunderboltOutlined,
  SmileOutlined,
  StarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { TestQuestion, getQuestionTypeDisplay, filterQuestionsByDifficulty } from "@/utils/testData";

const { Title, Text } = Typography;

const difficultyLevels = [
  { key: "all", label: "All Levels", icon: <SmileOutlined />, color: "#d9f7be", desc: "Mix of all difficulty levels" },
  { key: "easy", label: "Easy", icon: <StarOutlined />, color: "#bae7ff", desc: "Beginner friendly questions" },
  { key: "medium", label: "Medium", icon: <ThunderboltOutlined />, color: "#fff7e6", desc: "Balanced mix of challenges" },
  { key: "hard", label: "Hard", icon: <TrophyOutlined />, color: "#ffd6d6", desc: "Advanced level challenges" },
];

export default function DifficultyPage() {
  const [level, setLevel] = useState("all");
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questionStats, setQuestionStats] = useState<{type: string, count: number}[]>([]);
  const [difficultyStats, setDifficultyStats] = useState<{difficulty: string, count: number}[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedTest = sessionStorage.getItem('currentTest');
    if (storedTest) {
      const test = JSON.parse(storedTest);
      setTestInfo(test);
      
      // Calculate question type statistics
      const typeCounts = test.questions.reduce((acc: any, question: TestQuestion) => {
        acc[question.type] = (acc[question.type] || 0) + 1;
        return acc;
      }, {});
      
      const stats = Object.entries(typeCounts).map(([type, count]) => ({
        type,
        count: count as number
      }));
      setQuestionStats(stats);

      // Calculate difficulty statistics
      const difficultyCounts = test.questions.reduce((acc: any, question: TestQuestion) => {
        acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
        return acc;
      }, {});
      
      const diffStats = Object.entries(difficultyCounts).map(([difficulty, count]) => ({
        difficulty,
        count: count as number
      }));
      setDifficultyStats(diffStats);
    } else {
      router.push('/tests');
    }
  }, [router]);

  const handleNext = () => {
    sessionStorage.setItem('testDifficulty', level);
    router.push("/tests/instructions");
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

  const filteredQuestions = level === 'all' 
    ? testInfo.questions 
    : testInfo.questions.filter((q: TestQuestion) => q.difficulty === level);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e6f0ff 0%, #ffffff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Card
        style={{
          maxWidth: 1000,
          width: "100%",
          padding: "30px 40px",
          borderRadius: 20,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={4} style={{ color: "#666", marginBottom: 8 }}>
            {testInfo.domain}
          </Title>
          <Title level={2} style={{ marginBottom: 10, fontWeight: 700 }}>
            {testInfo.title}
          </Title>
          <p style={{ color: "#888", fontSize: 16 }}>
            {testInfo.totalQuestions} questions • {testInfo.duration} minutes
          </p>
          
          {/* Question Statistics */}
          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col span={12}>
              <div style={{ background: '#f8f9fa', padding: 15, borderRadius: 8 }}>
                <Title level={5} style={{ marginBottom: 10 }}>Question Types</Title>
                {questionStats.map(stat => (
                  <div key={stat.type} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>{getQuestionTypeDisplay(stat.type)}</Text>
                    <Tag color="blue">{stat.count}</Tag>
                  </div>
                ))}
              </div>
            </Col>
            <Col span={12}>
              <div style={{ background: '#f8f9fa', padding: 15, borderRadius: 8 }}>
                <Title level={5} style={{ marginBottom: 10 }}>Difficulty Levels</Title>
                {difficultyStats.map(stat => (
                  <div key={stat.difficulty} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>{stat.difficulty.charAt(0).toUpperCase() + stat.difficulty.slice(1)}</Text>
                    <Tag color={
                      stat.difficulty === 'easy' ? 'green' : 
                      stat.difficulty === 'medium' ? 'orange' : 'red'
                    }>
                      {stat.count}
                    </Tag>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 40, fontWeight: 700 }}
        >
          🎯 Select Difficulty Level
        </Title>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 15,
            marginBottom: 30,
          }}
        >
          {difficultyLevels.map((item) => (
            <div
              key={item.key}
              onClick={() => setLevel(item.key)}
              style={{
                flex: "1 1 0",
                cursor: "pointer",
                padding: 15,
                borderRadius: 14,
                border: level === item.key ? "2px solid #1677ff" : "1px solid #e5e5e5",
                background: level === item.key
                  ? `linear-gradient(135deg, ${item.color} 0%, #ffffff 100%)`
                  : "#fafafa",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                minHeight: 120,
                transition: "all 0.3s ease-in-out",
                boxShadow: level === item.key
                  ? "0 8px 20px rgba(22,119,255,0.15)"
                  : "0 2px 8px rgba(0,0,0,0.05)",
                transform: level === item.key ? "scale(1.05)" : "scale(1)",
                minWidth: 150,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = level === item.key ? "scale(1.05)" : "scale(1)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: level === item.key ? "#1677ff" : "#e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: level === item.key ? "#fff" : "#666",
                  fontSize: 24,
                  marginBottom: 12,
                  transition: "all 0.3s",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 6,
                  color: level === item.key ? "#1677ff" : "#333",
                  transition: "color 0.3s",
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: 13, color: "#666" }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Selected Questions Preview */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: 20, 
          borderRadius: 12, 
          marginBottom: 30,
          border: '1px solid #e9ecef'
        }}>
          <Title level={4} style={{ marginBottom: 15 }}>
            Selected Questions: {filteredQuestions.length}
          </Title>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {filteredQuestions.slice(0, 8).map((question: TestQuestion, index: number) => (
              <Tag key={index} color={
                question.difficulty === 'easy' ? 'green' : 
                question.difficulty === 'medium' ? 'orange' : 'red'
              }>
                Q{index + 1}: {question.type}
              </Tag>
            ))}
            {filteredQuestions.length > 8 && (
              <Tag>+{filteredQuestions.length - 8} more</Tag>
            )}
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handleNext}
          style={{
            height: 50,
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 12,
            background: "linear-gradient(90deg, #1677ff, #40a9ff)",
            border: "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Next →
        </Button>
      </Card>
    </div>
  );
}