// RecommendedCourses.jsx
"use client";
import React from "react";
import { Card, List, Button, Rate, Tag } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";

export default function RecommendedCourses({ dict, lang }:any) {
  const recommendedCourses = [
    {
      id: 1,
      title: "Medical Ethics in Practice",
      instructor: "Dr. Robert Wilson",
      rating: 4.8,
      students: 1247,
      duration: "2h 15m",
      level: "Intermediate",
      category: "Ethics",
      thumbnail: "/images/ethics.jpg"
    },
    {
      id: 2,
      title: "Advanced Surgical Techniques",
      instructor: "Dr. Lisa Park",
      rating: 4.9,
      students: 892,
      duration: "5h 30m",
      level: "Advanced",
      category: "Surgery",
      thumbnail: "/images/surgery.jpg"
    },
    {
      id: 3,
      title: "Digital Health Innovations",
      instructor: "Dr. James Kumar",
      rating: 4.6,
      students: 1563,
      duration: "3h 45m",
      level: "Beginner",
      category: "Technology",
      thumbnail: "/images/digital-health.jpg"
    }
  ];

  return (
    <Card 
      title={dict?.recommendedCourses || "Recommended for You"} 
      style={{ borderRadius: 12 }}
    >
      <List
        dataSource={recommendedCourses}
        renderItem={course => (
          <List.Item>
            <div style={{ display: "flex", width: "100%" }}>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 8, 
                  objectFit: "cover",
                  marginRight: 12 
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                  {course.title}
                </div>
                <div style={{ color: "#666", fontSize: 12, marginBottom: 4 }}>
                  {course.instructor}
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                  <Rate disabled defaultValue={course.rating}  style={{ fontSize: 14 }}  />
                  <span style={{ marginLeft: 8, fontSize: 12 }}>({course.rating})</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Tag color="blue" style={{ fontSize: 10 }}>{course.level}</Tag>
                  <Tag color="green" style={{ fontSize: 10 }}>{course.category}</Tag>
                </div>
              </div>
              <Button type="primary" size="small" style={{ alignSelf: "center" }}>
                Enroll
              </Button>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}