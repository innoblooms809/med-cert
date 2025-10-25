// RecentActivity.jsx
"use client";
import React from "react";
import { Card, Timeline } from "antd";
import { 
  PlayCircleOutlined, 
  CheckCircleOutlined, 
  FileTextOutlined,
  TrophyOutlined 
} from "@ant-design/icons";

export default function RecentActivity({ dict, lang }:any) {
  const activities = [
    {
      type: "video",
      action: "Watched",
      title: "Cardiac Arrhythmias Lecture",
      course: "Advanced Cardiology",
      time: "2 hours ago",
      icon: <PlayCircleOutlined style={{ color: "#1890ff" }} />,
      color: "blue"
    },
    {
      type: "test",
      action: "Completed",
      title: "Emergency Medicine Quiz",
      course: "Emergency Procedures",
      time: "1 day ago",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      color: "green"
    },
    {
      type: "certificate",
      action: "Earned",
      title: "Basic Life Support Certificate",
      course: "BLS Training",
      time: "2 days ago",
      icon: <TrophyOutlined style={{ color: "#faad14" }} />,
      color: "orange"
    },
    {
      type: "material",
      action: "Downloaded",
      title: "Clinical Guidelines PDF",
      course: "Medical Protocols",
      time: "3 days ago",
      icon: <FileTextOutlined style={{ color: "#722ed1" }} />,
      color: "purple"
    }
  ];

  // Convert activities to Timeline items format
  const timelineItems = activities.map((activity, index) => ({
    key: index,
    color: activity.color,
    dot: activity.icon,
    children: (
      <div>
        <div style={{ fontWeight: 500 }}>
          {activity.action}: {activity.title}
        </div>
        <div style={{ color: "#666", fontSize: 12 }}>
          {activity.course}
        </div>
        <div style={{ color: "#999", fontSize: 11 }}>
          {activity.time}
        </div>
      </div>
    ),
  }));

  return (
    <Card 
      title={dict?.recentActivity || "Recent Activity"} 
      style={{ borderRadius: 12 }}
    >
      <Timeline items={timelineItems} />
    </Card>
  );
}