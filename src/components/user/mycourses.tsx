"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Tabs,
  List,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import {
  PlayCircleOutlined,
  FilePdfOutlined,
  NotificationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export default function MyCourses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});

  const courses = [
    {
      id: 1,
      title: "Lecture 1 - Heart Anatomy",
      description: "Overview of cardiac chambers, valves and major vessels.",
      image: "/images/cardiology.jpg",
      video: "/videos/video.mp4",
      announcements: ["Live doubt session on Friday", "Assignment due next week"],
      tests: [
        { id: "t1", name: "Heart Anatomy Quiz", language: "English/Arabic" },
        { id: "t2", name: "Anatomy MCQ", language: "English/Arabic" },
      ],
      pdfs: ["/pdfs/Heart-Anatomy-Notes.pdf", "/pdfs/Cardiac-Diagram.pdf"],
    },
    {
      id: 2,
      title: "Lecture 2 - ECG Basics",
      description: "How to read a basic ECG and recognize common patterns.",
      image: "/images/lecture2.jpg",
      video: "/videos/lecture2.mp4",
      announcements: ["Quiz will be unlocked Sunday"],
      tests: [{ id: "t3", name: "ECG Pattern Test", language: "English" }],
      pdfs: ["/pdfs/ECG-Basics.pdf"],
    },
    {
      id: 3,
      title: "Lecture 3 - Cardiac Pharmacology",
      description: "Key drugs used in emergency cardiac care and their effects.",
      image: "/images/lecture3.jpg",
      video: "/videos/lecture3.mp4",
      announcements: ["MCQ practice paper uploaded"],
      tests: [{ id: "t4", name: "Pharma Quiz", language: "Arabic" }],
      pdfs: ["/pdfs/Cardiac-Drugs.pdf"],
    },
    {
      id: 4,
      title: "Lecture 4 - Interventions",
      description: "PCI basics and indications — case discussions.",
      image: "/images/lecture4.jpg",
      video: "/videos/lecture4.mp4",
      announcements: ["Case study discussion on Wednesday"],
      tests: [{ id: "t5", name: "Intervention Quiz", language: "English" }],
      pdfs: ["/pdfs/PCI-Guidelines.pdf"],
    },
  ];

  const handleStartTest = (testId: string) => {
    message.success("Redirecting to Mock Quiz Page...");
    setTestResults((prev) => ({ ...prev, [testId]: true }));
  };

  const handleViewResult = (testId: string) => {
    if (!testResults[testId]) {
      message.warning("Please complete the test first!");
    } else {
      message.info("Showing result for " + testId);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!selectedCourse ? (
        <>
          <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
            Your Courses
          </Title>
          <Row gutter={[16, 16]}>
            {courses.map((course) => (
              <Col xs={24} md={12} key={course.id}>
                <Card
                  hoverable
                  style={{ borderRadius: "10px" }}
                  cover={
                    <img
                      alt={course.title}
                      src={course.image}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Button
                      key="play"
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      onClick={() => setSelectedCourse(course)}
                    >
                      Play
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={course.title}
                    description={course.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div>
          {/* Back Button */}
          <Button
            onClick={() => setSelectedCourse(null)}
            style={{ marginBottom: "15px" }}
          >
            ← Back
          </Button>

          {/* Video Section */}
          <Title level={3}>{selectedCourse.title}</Title>
          <video
            controls
            src={selectedCourse.video}
            style={{
              width: "100%",
              maxHeight: "400px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />

          {/* Tabs */}
          <Tabs
            defaultActiveKey="announcements"
            items={[
              {
                key: "announcements",
                label: (
                  <>
                    <NotificationOutlined /> Announcements
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.announcements}
                    renderItem={(item: string) => <List.Item>{item}</List.Item>}
                  />
                ),
              },
              {
                key: "tests",
                label: (
                  <>
                    <ProfileOutlined /> Test Series
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.tests}
                    renderItem={(t: any) => (
                      <List.Item
                        actions={[
                          <Button
                            key="start"
                            type="primary"
                            onClick={() => handleStartTest(t.id)}
                          >
                            Start Test
                          </Button>,
                          <Button
                            key="view"
                            onClick={() => handleViewResult(t.id)}
                          >
                            View Result
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={t.name}
                          description={`Language: ${t.language}`}
                        />
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                key: "pdfs",
                label: (
                  <>
                    <FilePdfOutlined /> Supporting PDFs
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.pdfs}
                    renderItem={(p: string) => (
                      <List.Item>
                        <a href={p} target="_blank" rel="noreferrer">
                          {p.split("/").pop()}
                        </a>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
