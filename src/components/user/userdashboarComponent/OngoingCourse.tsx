// OngoingCourses.jsx
"use client";
import React from "react";
import { Card, List, Progress, Button, Tag } from "antd";
import { PlayCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function OngoingCourses({ dict, lang }:any) {
  const ongoingCourses = [
    {
      id: 1,
      title: "Advanced Cardiology",
      instructor: "Dr. Sarah Johnson",
      progress: 65,
      thumbnail: "/images/cardiology.jpg",
      duration: "4h 30m",
      lastAccessed: "2 hours ago",
      nextLesson: "Heart Failure Management"
    },
    {
      id: 2,
      title: "Emergency Medicine",
      instructor: "Dr. Mike Chen",
      progress: 30,
      thumbnail: "/images/emergency.jpg", 
      duration: "6h 15m",
      lastAccessed: "1 day ago",
      nextLesson: "Trauma Assessment"
    },
    {
      id: 3,
      title: "Pediatric Care",
      instructor: "Dr. Emily Davis",
      progress: 45,
      thumbnail: "/images/pediatrics.jpg",
      duration: "3h 45m",
      lastAccessed: "3 days ago",
      nextLesson: "Child Development"
    }
  ];

  return (
    <Card 
      title={dict?.ongoingCourses || "Continue Learning"} 
      extra={<Button type="link">View All</Button>}
      style={{ borderRadius: 12 }}
    >
      <List
        dataSource={ongoingCourses}
        renderItem={course => (
          <List.Item>
            <div style={{ display: "flex", width: "100%", alignItems: "flex-start" }}>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                style={{ 
                  width: 80, 
                  height: 60, 
                  borderRadius: 8, 
                  objectFit: "cover",
                  marginRight: 16 
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{course.title}</div>
                <div style={{ color: "#666", fontSize: 12, marginBottom: 8 }}>
                  {course.instructor} • {course.duration}
                </div>
                <Progress percent={course.progress} size="small" />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: "#666" }}>
                    Next: {course.nextLesson}
                  </span>
                  <Tag color="blue" style={{ fontSize: 12 }}>
                    {course.lastAccessed}
                  </Tag>
                </div>
              </div>
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />}
                style={{ marginLeft: 12 }}
              >
                Continue
              </Button>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}