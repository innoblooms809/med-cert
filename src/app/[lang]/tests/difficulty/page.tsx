"use client";

import { useState } from "react";
import { Typography, Button, Card } from "antd";
import { useRouter } from "next/navigation";
import {
  ThunderboltOutlined,
  SmileOutlined,
  StarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const difficultyLevels = [
  { key: "novice", label: "Novice", icon: <SmileOutlined />, color: "#d9f7be", desc: "Best for absolute beginners." },
  { key: "easy", label: "Easy", icon: <StarOutlined />, color: "#bae7ff", desc: "Light practice for quick learners." },
  { key: "medium", label: "Medium", icon: <ThunderboltOutlined />, color: "#fff7e6", desc: "Balanced mix of challenges." },
  { key: "expert", label: "Expert", icon: <TrophyOutlined />, color: "#ffd6d6", desc: "Difficult questions for pros." },
];

export default function DifficultyPage() {
  const [level, setLevel] = useState("easy");
  const router = useRouter();

  const handleNext = () => {
    router.push("/tests/instructions");
  };

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
          maxWidth: 900,
          width: "100%",
          padding: "30px 40px",
          borderRadius: 20,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", marginBottom: 40, fontWeight: 700 }}
        >
          🎯 Select Your Difficulty Level
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
                minWidth: 150, // smaller width to fit all cards
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
