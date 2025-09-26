"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Quiz {
  testType: "Objective" | "Subjective";
  testFor: string; // Doctor / Nurse
  specialization: string;
}

// Mock data
const quizzes: Quiz[] = [
  { testType: "Objective", testFor: "Doctor", specialization: "ENT" },
  { testType: "Objective", testFor: "Doctor", specialization: "Cardiology" },
  { testType: "Subjective", testFor: "Doctor", specialization: "Orthopedic" },
  { testType: "Objective", testFor: "Nurse", specialization: "ICU" },
  { testType: "Subjective", testFor: "Nurse", specialization: "General" },
  { testType: "Objective", testFor: "Nurse", specialization: "Pediatric" },
  { testType: "Objective", testFor: "Doctor", specialization: "ENT" },
  { testType: "Subjective", testFor: "Doctor", specialization: "Cardiology" },
  { testType: "Objective", testFor: "Nurse", specialization: "ICU" },
];

export default function TestAnalytics() {
  // Group bar chart data
  const barMap: Record<string, { Objective: number; Subjective: number }> = {};
  quizzes.forEach((q) => {
    if (!barMap[q.specialization]) barMap[q.specialization] = { Objective: 0, Subjective: 0 };
    barMap[q.specialization][q.testType] += 1;
  });

  const barData = Object.keys(barMap).map((key) => ({
    specialization: key,
    Objective: barMap[key].Objective,
    Subjective: barMap[key].Subjective,
  }));

  // Donut chart data
  const roleMap: Record<string, number> = {};
  quizzes.forEach((q) => {
    roleMap[q.testFor] = (roleMap[q.testFor] || 0) + 1;
  });

  const pieData = Object.keys(roleMap).map((key) => ({
    name: key,
    value: roleMap[key],
  }));

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <Row gutter={[24, 24]} style={{ padding: 24 }}>
      {/* Grouped Bar Chart */}
      <Col xs={24} md={16}>
        <Card
          title="📊 Tests by Specialization & Type"
          style={{
            borderRadius: 16,
            background: "var(--content-bg)", // theme background
            color: "var(--section-text)", // theme text
            boxShadow: "0 8px 24px rgba(79,70,229,0.15)", // match your cards shadow
            border: "none",
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="specialization" stroke="var(--section-text)" />
              <YAxis stroke="var(--section-text)" />
              <Tooltip
                contentStyle={{
                  background: "var(--card-bg)",
                  borderRadius: 8,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  color: "var(--section-text)",
                }}
              />
              <Legend />
              <Bar dataKey="Objective" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Subjective" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      {/* Donut Chart */}
      <Col xs={24} md={8}>
        <Card
          title="📊 Test Role Distribution"
          style={{
            borderRadius: 16,
            background: "var(--content-bg)",
            color: "var(--section-text)",
            boxShadow: "0 8px 24px rgba(79,70,229,0.15)",
            border: "none",
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={(entry) => `${entry.name} (${entry.value})`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--card-bg)",
                  borderRadius: 8,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  color: "var(--section-text)",
                }}
              />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
}
