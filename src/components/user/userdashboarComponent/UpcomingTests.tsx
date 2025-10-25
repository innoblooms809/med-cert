// UpcomingTests.jsx
"use client";
import React from "react";
import { Card, List, Button, Tag } from "antd";
import { ClockCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export default function UpcomingTests({ dict, lang }:any) {
  const upcomingTests = [
    {
      id: 1,
      title: "Cardiology Final Exam",
      course: "Advanced Cardiology",
      dueDate: "2024-01-15",
      duration: "60 minutes",
      questions: 50,
      status: "upcoming",
      priority: "high"
    },
    {
      id: 2,
      title: "Patient Safety Assessment",
      course: "Healthcare Protocols", 
      dueDate: "2024-01-18",
      duration: "45 minutes",
      questions: 30,
      status: "available",
      priority: "medium"
    },
    {
      id: 3,
      title: "Medical Ethics Quiz",
      course: "Professional Ethics",
      dueDate: "2024-01-20",
      duration: "30 minutes", 
      questions: 20,
      status: "upcoming",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    const colors = {
      high: "red",
      medium: "orange", 
      low: "blue"
    };
    return colors[priority] || "blue";
  };

  return (
    <Card 
      title={dict?.upcomingTests || "Upcoming Tests"} 
      style={{ borderRadius: 12 }}
    >
      <List
        dataSource={upcomingTests}
        renderItem={test => (
          <List.Item
            actions={[
              <Button type="primary" size="small">
                Start Test
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<ClockCircleOutlined style={{ fontSize: 20, color: "#1890ff" }} />}
              title={
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {test.title}
                  <Tag 
                    color={getPriorityColor(test.priority as "high" | "medium" | "low")} 
                    style={{ marginLeft: 8, fontSize: 10 }}
                  >
                    {test.priority}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <div style={{ fontSize: 12 }}>{test.course}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>
                    Due: {test.dueDate} • {test.duration} • {test.questions} questions
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}