"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Action {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  link?: string;
}

const actions: Action[] = [
  {
    title: "Create New Course",
    description: "Add a new course to the platform",
    icon: "📚",
    iconBg: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    iconColor: "#fff",
    link: "/admin/courses/new",
  },
  {
    title: "Create New Quiz",
    description: "Add a new quiz to the platform",
    icon: "📝",
    iconBg: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    iconColor: "#fff",
    link: "/admin/quizzes/new",
  },
  {
    title: "Manage Users",
    description: "View and manage all users",
    icon: "👥",
    iconBg: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    iconColor: "#fff",
    link: "/admin/users",
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {actions.map((action, idx) => (
        <div
          key={idx}
          onClick={() => action.link && router.push(action.link)}
          className="relative flex items-center gap-4 p-6 rounded-xl cursor-pointer transform transition-all hover:scale-105"
          style={{
            background: "var(--content-bg)",
            color: "var(--section-text)",
            boxShadow: "0 8px 24px rgba(79,70,229,0.15)",
          }}
        >
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl transition-all duration-300"
            style={{ background: action.iconBg, color: action.iconColor }}
          >
            {action.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold" style={{ color: "var(--section-text)" }}>
              {action.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--section-text)" }}>
              {action.description}
            </p>
          </div>

          {/* Pulse accent */}
          <div
            className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
            style={{ background: "var(--section-primary)" }}
          />
        </div>
      ))}
    </div>
  );
}
