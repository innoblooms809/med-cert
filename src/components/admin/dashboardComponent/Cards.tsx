"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import { BookOutlined, FileTextOutlined, UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Stats data
const stats = [
  {
    title: "Total Courses",
    value: 24,
    icon: <BookOutlined />,
    color: "#4f46e5",
    bg: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    path: "/admin/courses",
  },
  {
    title: "Total Tests",
    value: 18,
    icon: <FileTextOutlined />,
    color: "#ef4444",
    bg: "linear-gradient(135deg, #fee2e2, #fecaca)",
    path: "/admin/tests",
  },
  {
    title: "Active Users",
    value: 356,
    icon: <UserOutlined />,
    color: "#10b981",
    bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
    path: "/admin/users",
  },
  {
    title: "Completion Rate",
    value: "92%",
    icon: <CheckCircleOutlined />,
    color: "#f59e0b",
    bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
    path: "/admin/reports",
  },
];

// Single stat card
function StatCard({ stat }: { stat: typeof stats[0] }) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => router.push(stat.path)}
      style={{ cursor: "pointer" }}
    >
     <Card
  hoverable
  style={{
    borderRadius: 16,
    padding: "16px",
    border: "none",
    background: "#ffffff", // card background
    boxShadow: "0 6px 20px rgba(30,41,59,0.15), 0 10px 40px rgba(79,70,229,0.05)"
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
        boxShadow: `0 6px 16px ${stat.color}33`, // stronger icon shadow
      }}
    >
      {stat.icon}
    </div>
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#1f2937" }}>
        {stat.value}
      </div>
      <div style={{ color: "#6b7280", fontSize: 14 }}>{stat.title}</div>
    </div>
  </div>
</Card>

    </motion.div>
  );
}

// Main stats cards component
export default function StatsCards() {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        {stats.map((stat) => (
          <Col xs={24} sm={12} md={6} key={stat.title}>
            <StatCard stat={stat} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
