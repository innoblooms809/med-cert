"use client";

import React from "react";
import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const activityData = [
  { date: "Mon", enrolled: 5, testAttempt: 3, certificate: 2 },
  { date: "Tue", enrolled: 8, testAttempt: 4, certificate: 3 },
  { date: "Wed", enrolled: 6, testAttempt: 2, certificate: 1 },
  { date: "Thu", enrolled: 10, testAttempt: 6, certificate: 5 },
  { date: "Fri", enrolled: 4, testAttempt: 1, certificate: 2 },
  { date: "Sat", enrolled: 7, testAttempt: 3, certificate: 4 },
  { date: "Sun", enrolled: 3, testAttempt: 2, certificate: 1 },
];

export default function WeeklyActivityTrend() {
  return (
    <Card
      title="📊 Weekly Activity Trend"
      style={{
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(79,70,229,0.1)",
        border: "none",
        background: "var(--content-bg)",  // <-- This sets the card's background
        marginTop: 24,
      }}
    >

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="enrolledGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="testAttemptGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="certificateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#4b5563" />
          <YAxis stroke="#4b5563" />
          <Tooltip
            contentStyle={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(79,70,229,0.1)",
              border: "none",
            }}
          />
          <Legend verticalAlign="top" height={36} />

          <Bar dataKey="enrolled" stackId="a" fill="url(#enrolledGradient)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="testAttempt" stackId="a" fill="url(#testAttemptGradient)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="certificate" stackId="a" fill="url(#certificateGradient)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
