"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ActionTrend {
  day: string;
  courses: number;
  quizzes: number;
  users: number;
}

interface Props {
  trends?: ActionTrend[];
}

// Sample trend data
const sampleTrends: ActionTrend[] = [
  { day: "Mon", courses: 2, quizzes: 1, users: 5 },
  { day: "Tue", courses: 3, quizzes: 2, users: 8 },
  { day: "Wed", courses: 4, quizzes: 3, users: 10 },
  { day: "Thu", courses: 5, quizzes: 2, users: 7 },
  { day: "Fri", courses: 6, quizzes: 4, users: 12 },
  { day: "Sat", courses: 3, quizzes: 1, users: 6 },
  { day: "Sun", courses: 2, quizzes: 2, users: 4 },
];

export default function QuickActionsTrend({ trends = sampleTrends }: Props) {
  return (
    <Card
      title="📈 Weekly Activity Overview"
      style={{
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(79,70,229,0.15)",
        margin: "24px 0",
        background: "var(--content-bg)",
        color: "var(--section-text)",
      }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={trends}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="coursesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="quizzesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="day" stroke="var(--section-text)" />
          <YAxis stroke="var(--section-text)" />
          <Tooltip
            contentStyle={{
              background: "var(--content-bg)",
              color: "var(--section-text)",
              borderRadius: 8,
              boxShadow: "0 6px 20px rgba(79,70,229,0.15)",
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ color: "var(--section-text)" }}
          />
          <Area type="monotone" dataKey="courses" stroke="#4f46e5" fill="url(#coursesGradient)" strokeWidth={2} />
          <Area type="monotone" dataKey="quizzes" stroke="#ef4444" fill="url(#quizzesGradient)" strokeWidth={2} />
          <Area type="monotone" dataKey="users" stroke="#10b981" fill="url(#usersGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
