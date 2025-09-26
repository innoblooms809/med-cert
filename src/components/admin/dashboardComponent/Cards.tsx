"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import { BookOutlined, FileTextOutlined, UserOutlined, CheckCircleOutlined } from "@ant-design/icons";

const stats = [
  {
    title: "Total Courses",
    value: 24,
    icon: <BookOutlined />,
    color: "#4f46e5",
    bg: "rgba(79, 70, 229, 0.1)",
  },
  {
    title: "Total Tests",
    value: 18,
    icon: <FileTextOutlined />,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.1)",
  },
  {
    title: "Active Users",
    value: 356,
    icon: <UserOutlined />,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  {
    title: "Completion Rate",
    value: "92%",
    icon: <CheckCircleOutlined />,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
  },
];

export default function StatsCards() {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} md={6} key={stat.title}>
            <Card
              hoverable
              style={{
                borderRadius: 12,
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    fontSize: 28,
                    padding: 16,
                    borderRadius: "50%",
                    background: stat.bg,
                    color: stat.color,
                    marginRight: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 600 }}>{stat.value}</div>
                  <div style={{ color: "#6b7280" }}>{stat.title}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
