"use client";

import React from "react";
import { Card, Table, Tag, Progress } from "antd";

interface UserProgress {
  key: string;
  name: string;
  course: string;
  score: number;
  certificate: "Issued" | "Pending";
}

const data: UserProgress[] = [
  { key: "1", name: "Ali Khan", course: "CPR Training", score: 85, certificate: "Issued" },
  { key: "2", name: "Maria Ahmed", course: "First Aid", score: 65, certificate: "Pending" },
  { key: "3", name: "Dr. Ahmed", course: "Emergency Care", score: 92, certificate: "Issued" },
  { key: "4", name: "Sara Ali", course: "Trauma Care", score: 50, certificate: "Pending" },
];

export default function ProgressTable() {
  const columns = [
    {
      title: "👤 User",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "📚 Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "📝 Score",
      dataIndex: "score",
      key: "score",
      render: (score: number) => (
        <Progress
          percent={score}
          size="small"
          strokeColor={{
            "0%": "#4f46e5",
            "100%": "#6366f1",
          }}
          trailColor="rgba(0,0,0,0.05)"
          status={score >= 70 ? "active" : "exception"}
        />
      ),
    },
    {
      title: "🎓 Certificate",
      dataIndex: "certificate",
      key: "certificate",
      render: (status: "Issued" | "Pending") => (
        <Tag
          style={{
            borderRadius: 12,
            padding: "2px 12px",
            fontWeight: 600,
            background: status === "Issued"
              ? "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
              : "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
            color: "#fff",
          }}
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Card
      title="📋 Recent User Progress"
      style={{
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(79,70,229,0.15)",
        border: "none",
        marginTop: 24,
        background: "var(--content-bg)",
        color: "var(--section-text)",
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered={false}
        rowClassName={() => "hover-row"}
        style={{ color: "var(--section-text)" }}
      />
      <style jsx>{`
        .hover-row:hover {
          background: rgba(79, 70, 229, 0.05);
        }
        .ant-table-thead > tr > th {
          background: transparent;
          color: var(--section-text);
          font-weight: 600;
        }
        .ant-table-tbody > tr > td {
          background: transparent;
          color: var(--section-text);
        }
      `}</style>
    </Card>
  );
}
