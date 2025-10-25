// LearningProgress.jsx
"use client";
import React from "react";
import { Card, Progress, Row, Col, Statistic } from "antd";
import { RiseOutlined, TrophyOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function LearningProgress({ dict, lang }:any) {
  const progressData = [
    {
      title: "Course Completion",
      percent: 65,
      color: "#1890ff",
      current: 8,
      total: 12
    },
    {
      title: "Test Success Rate", 
      percent: 85,
      color: "#52c41a",
      current: 34,
      total: 40
    },
    {
      title: "Learning Consistency",
      percent: 72,
      color: "#fa8c16",
      current: 18,
      total: 25
    }
  ];

  return (
    <Card title={dict?.learningProgress || "Learning Progress"} style={{ borderRadius: 12 }}>
      <Row gutter={[16, 16]}>
        {progressData.map((item, index) => (
          <Col xs={24} md={8} key={index}>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={item.percent}
                strokeColor={item.color}
                size={120}
                format={percent => (
                  <div>
                    <div style={{ fontSize: 24, fontWeight: "bold" }}>{percent}%</div>
                    <div style={{ fontSize: 10, color: "#666" }}>{item.title}</div>
                  </div>
                )}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                {item.current}/{item.total} completed
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
}