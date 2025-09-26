"use client";

import React from "react";

interface Activity {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  time: string;
}

const recentActivities: Activity[] = [
  {
    title: "New course added",
    description: "Emergency Response course was added",
    icon: "📚",
    iconBg: "rgba(79, 70, 229, 0.1)",
    iconColor: "#4f46e5",
    time: "2 hours ago",
  },
  {
    title: "Quiz completed",
    description: "Cardiology quiz was completed by 25 users",
    icon: "📝",
    iconBg: "rgba(239, 68, 68, 0.1)",
    iconColor: "#ef4444",
    time: "5 hours ago",
  },
  {
    title: "New user registered",
    description: "Dr. Sarah Johnson joined the platform",
    icon: "👥",
    iconBg: "rgba(16, 185, 129, 0.1)",
    iconColor: "#10b981",
    time: "Yesterday",
  },
];

export default function ReportData() {
  return (
    <div style={{
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      background: "#fff",
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
    }}>
      <div style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #e2e8f0"
      }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Recent Activity</h2>
      </div>

      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {recentActivities.map((activity, index) => (
          <div key={index} style={{ display: "flex", gap: "1rem" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: activity.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: activity.iconColor,
              flexShrink: 0,
              fontSize: "1.25rem",
            }}>
              {activity.icon}
            </div>
            <div>
              <div style={{ fontWeight: 500, marginBottom: "0.25rem" }}>{activity.title}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b" }}>{activity.description}</div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
