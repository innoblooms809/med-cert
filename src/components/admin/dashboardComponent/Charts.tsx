"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

// Mock data
const enrollmentData = [
  { course: "CPR Training", students: 120 },
  { course: "First Aid", students: 80 },
  { course: "Emergency Care", students: 65 },
  { course: "Trauma Care", students: 40 },
];

const certificateData = [
  { month: "Jan", certificates: 20 },
  { month: "Feb", certificates: 35 },
  { month: "Mar", certificates: 50 },
  { month: "Apr", certificates: 40 },
  { month: "May", certificates: 60 },
  { month: "Jun", certificates: 75 },
];

export default function Charts() {
  const barColors = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"];
  const lineGradientId = "certificatesGradient";

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        {/* Course Enrollments (Bar Chart) */}
        <Col xs={24} md={12}>
          <Card
            title="📊 Course Enrollments"
            style={{
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(79,70,229,0.15)",
              border: "none",
              background: "var(--content-bg)",
              color: "var(--section-text)",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <defs>
                  {enrollmentData.map((entry, index) => (
                    <linearGradient
                      key={index}
                      id={`barGradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={barColors[index % barColors.length]} stopOpacity={0.8}/>
                      <stop offset="100%" stopColor={barColors[index % barColors.length]} stopOpacity={0.2}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "var(--content-bg)",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
                <Legend />
                <Bar dataKey="students" radius={[8, 8, 0, 0]}>
                  {enrollmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#barGradient-${index})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Certificates Trend (Line Chart) */}
        <Col xs={24} md={12}>
          <Card
            title="📈 Certificates Issued Over Time"
            style={{
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(79,70,229,0.15)",
              border: "none",
              background: "var(--content-bg)",
              color: "var(--section-text)",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={certificateData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id={lineGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    background: "var(--content-bg)",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
                <Legend verticalAlign="top" />
                <Line
                  type="monotone"
                  dataKey="certificates"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#10b981" }}
                  activeDot={{ r: 8 }}
                  fill={`url(#${lineGradientId})`}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
