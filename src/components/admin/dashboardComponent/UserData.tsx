"use client";

import React from "react";

interface Action {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
}

const actions: Action[] = [
  {
    title: "Create New Course",
    description: "Add a new course to the platform",
    icon: "📚",
    iconBg: "rgba(79, 70, 229, 0.1)",
    iconColor: "#4f46e5",
  },
  {
    title: "Create New Quiz",
    description: "Add a new quiz to the platform",
    icon: "📝",
    iconBg: "rgba(239, 68, 68, 0.1)",
    iconColor: "#ef4444",
  },
  {
    title: "Manage Users",
    description: "View and manage all users",
    icon: "👥",
    iconBg: "rgba(16, 185, 129, 0.1)",
    iconColor: "#10b981",
  },
];

export default function UserData() {
  return (
    <div style={{
      borderRadius: 12,
      border: "1px solid #e2e8f0",
      background: "#fff",
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    }}>
      <div style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Quick Actions</h2>
      </div>

      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={action.onClick}
            style={{
              padding: "1.25rem",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.borderColor = "#6366f1";
              target.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.borderColor = "#e2e8f0";
              target.style.boxShadow = "none";
            }}
          >
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "8px",
              background: action.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: action.iconColor,
              fontSize: "1.5rem",
            }}>
              {action.icon}
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{action.title}</div>
              <div style={{ fontSize: "0.875rem", color: "#64748b" }}>{action.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
