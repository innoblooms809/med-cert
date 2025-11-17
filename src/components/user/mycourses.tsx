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
import Image from "next/image";
import cardio from "../../../public/images/cardiology.jpg";
import basics from "../../../public/images/ECG.jpeg";
import pharma from "../../../public/images/pharma.jpg";
import inter from "../../../public/images/inter.png";
const { Title } = Typography;

export default function MyCourses({ dict, lang }: any) {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>(
    {}
  );

  const courses = [
    {
      id: 1,
      title:
        dict?.myCoursesData?.lecture1 || "Lecture 1 - Heart Anatomy",
      description:
        dict?.myCoursesData?.lecture1Desc ||
        "Overview of cardiac chambers, valves and major vessels.",
      image: cardio,
      video: "/videos/alice.mp4",
      announcements: [
        dict?.myCoursesData?.lecture1A1 || "Live doubt session on Friday",
        dict?.myCoursesData?.lecture1A2 || "Assignment due next week",
      ],
      tests: [
        {
          id: "t1",
          name: dict?.myCoursesData?.heartQuiz || "Heart Anatomy Quiz",
          language: dict?.languageMixed || "English/Arabic",
        },
        {
          id: "t2",
          name: dict?.myCoursesData?.mcq || "Anatomy MCQ",
          language: dict?.languageMixed || "English/Arabic",
        },
      ],
      pdfs: ["/pdfs/Heart-Anatomy-Notes.pdf", "/pdfs/Cardiac-Diagram.pdf"],
    },
    {
      id: 2,
      title: dict?.myCoursesData?.lecture2 || "Lecture 2 - ECG Basics",
      description:
        dict?.myCoursesData?.lecture2Desc ||
        "How to read a basic ECG and recognize common patterns.",
      image: basics,
      video: "/assets/videos/alice.mp4",
      announcements: [
        dict?.myCoursesData?.lecture2A1 || "Quiz will be unlocked Sunday",
      ],
      tests: [
        {
          id: "t3",
          name: dict?.myCoursesData?.ecgTest || "ECG Pattern Test",
          language: dict?.languageEnglish || "English",
        },
      ],
      pdfs: ["/pdfs/ECG-Basics.pdf"],
    },
    {
      id: 3,
      title:
        dict?.myCoursesData?.lecture3 || "Lecture 3 - Cardiac Pharmacology",
      description:
        dict?.myCoursesData?.lecture3Desc ||
        "Key drugs used in emergency cardiac care and their effects.",
      image: pharma,
      video: "/videos/lecture3.mp4",
      announcements: [
        dict?.myCoursesData?.lecture3A1 ||
          "MCQ practice paper uploaded",
      ],
      tests: [
        {
          id: "t4",
          name: dict?.myCoursesData?.pharmaQuiz || "Pharma Quiz",
          language: dict?.languageArabic || "Arabic",
        },
      ],
      pdfs: ["/pdfs/Cardiac-Drugs.pdf"],
    },
    {
      id: 4,
      title:
        dict?.myCoursesData?.lecture4 || "Lecture 4 - Interventions",
      description:
        dict?.myCoursesData?.lecture4Desc ||
        "PCI basics and indications — case discussions.",
      image: inter,
      video: "/videos/lecture4.mp4",
      announcements: [
        dict?.myCoursesData?.lecture4A1 ||
          "Case study discussion on Wednesday",
      ],
      tests: [
        {
          id: "t5",
          name: dict?.myCoursesData?.interQuiz || "Intervention Quiz",
          language: dict?.languageEnglish || "English",
        },
      ],
      pdfs: ["/pdfs/PCI-Guidelines.pdf"],
    },
  ];

  const handleStartTest = (testId: string) => {
    message.success(dict?.messages?.redirectQuiz || "Redirecting to Mock Quiz Page...");
    setTestResults((prev) => ({ ...prev, [testId]: true }));
  };

  const handleViewResult = (testId: string) => {
    if (!testResults[testId]) {
      message.warning(dict?.messages?.completeTestFirst || "Please complete the test first!");
    } else {
      message.info(
        `${dict?.messages?.showingResult || "Showing result for"} ${testId}`
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!selectedCourse ? (
        <>
          <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
            {dict?.myCourses?.title || "Your Courses"}
          </Title>

          <Row gutter={[16, 16]}>
            {courses.map((course) => (
              <Col xs={24} md={12} key={course.id}>
                <Card
                  hoverable
                  style={{ borderRadius: "10px" }}
                  cover={
                    <Image
                      alt={course.title}
                      src={course.image}
                      style={{ height: "0o0", objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Button
                      key="play"
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      onClick={() => setSelectedCourse(course)}
                    >
                      {dict?.buttons?.play || "Play"}
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
            ← {dict?.buttons?.back || "Back"}
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
                    <NotificationOutlined />{" "}
                    {dict?.tabs?.announcements || "Announcements"}
                  </>
                ),
                children: (
                  <List
                    bordered
                    dataSource={selectedCourse.announcements}
                    renderItem={(item: string) => (
                      <List.Item>{item}</List.Item>
                    )}
                  />
                ),
              },
              {
                key: "tests",
                label: (
                  <>
                    <ProfileOutlined />{" "}
                    {dict?.tabs?.tests || "Test Series"}
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
                            {dict?.buttons?.startTest || "Start Test"}
                          </Button>,
                          <Button key="view" onClick={() => handleViewResult(t.id)}>
                            {dict?.buttons?.viewResult || "View Result"}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={t.name}
                          description={`${dict?.labels?.language || "Language"}: ${
                            t.language
                          }`}
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
                    <FilePdfOutlined />{" "}
                    {dict?.tabs?.pdfs || "Supporting PDFs"}
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
