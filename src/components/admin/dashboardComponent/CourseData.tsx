"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Course {
  id: string;
  title: string;
  specialization: string; // e.g., "ENT", "Orthopedic"
  courseRole: string; // "Doctor" | "Nurse"
}

// Mock Data
const courses: Course[] = [
  { id: "1", title: "ENT Basics", specialization: "ENT", courseRole: "Doctor" },
  { id: "2", title: "Orthopedic Care", specialization: "Orthopedic", courseRole: "Doctor" },
  { id: "3", title: "Cardiology Advanced", specialization: "Cardiology", courseRole: "Doctor" },
  { id: "4", title: "Neurology Overview", specialization: "Neurology", courseRole: "Doctor" },
  { id: "5", title: "Dermatology Cases", specialization: "Dermatology", courseRole: "Doctor" },
  { id: "6", title: "ENT Advanced", specialization: "ENT", courseRole: "Doctor" },
  { id: "7", title: "Orthopedic Surgery", specialization: "Orthopedic", courseRole: "Doctor" },
  { id: "8", title: "Cardiology Emergencies", specialization: "Cardiology", courseRole: "Doctor" },
  { id: "9", title: "ICU Procedures", specialization: "ICU", courseRole: "Nurse" },
  { id: "10", title: "General Nursing", specialization: "General", courseRole: "Nurse" },
  { id: "11", title: "Pediatric Nursing", specialization: "Pediatric", courseRole: "Nurse" },
  { id: "12", title: "ICU Advanced", specialization: "ICU", courseRole: "Nurse" },
  { id: "13", title: "General Nursing Skills", specialization: "General", courseRole: "Nurse" },
  { id: "14", title: "Pediatric Care", specialization: "Pediatric", courseRole: "Nurse" },
  { id: "15", title: "Emergency Nursing", specialization: "ICU", courseRole: "Nurse" },
];

export default function CoursesCharts() {
  // Aggregate data for bar chart (courses per specialization)
  const specializationMap: Record<string, number> = {};
  courses.forEach((c) => {
    specializationMap[c.specialization] = (specializationMap[c.specialization] || 0) + 1;
  });
  const barData = Object.keys(specializationMap).map((key) => ({
    specialization: key,
    courses: specializationMap[key],
  }));

  // Aggregate data for pie chart (courses per role)
  const roleMap: Record<string, number> = {};
  courses.forEach((c) => {
    roleMap[c.courseRole] = (roleMap[c.courseRole] || 0) + 1;
  });
  const pieData = Object.keys(roleMap).map((key) => ({
    name: key,
    value: roleMap[key],
  }));

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const cardShadow = "0 6px 20px rgba(30,41,59,0.15), 0 10px 40px rgba(79,70,229,0.05)";

  return (
    <Row gutter={[24, 24]} style={{ padding: 24 }}>
      {/* Bar Chart: Courses per Specialization */}
      <Col xs={24} md={12}>
        <Card
          title="📊 Courses by Specialization"
          style={{
            borderRadius: 16,
            boxShadow: cardShadow,
            background: "#fff",
            border: "none",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="specialization" stroke="#1f2937" />
              <YAxis stroke="#1f2937" />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
              <Bar dataKey="courses" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      {/* Pie Chart: Courses per Role */}
      <Col xs={24} md={12}>
        <Card
          title="📊 Courses by Role"
          style={{
            borderRadius: 16,
            boxShadow: cardShadow,
            background: "#fff",
            border: "none",
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={(entry) => `${entry.name} (${entry.value})`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
}
