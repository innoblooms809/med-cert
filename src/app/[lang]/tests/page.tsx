"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Tag,
  Tabs,
} from "antd";
import {
  SmileOutlined,
  WomanOutlined, 
  UserOutlined,
  SkinOutlined,
  SoundOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  CodeOutlined,
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { allTests, Test } from "@/utils/testData";
import hero from "@/../../public/images/OIP.jpeg";

// ========== Data ==========
const { Title, Paragraph } = Typography;

const domainIcons: Record<string, React.ReactNode> = {
  "Dentist": <SmileOutlined style={{ fontSize: 20 }} />,
  "Gynecologist": <WomanOutlined style={{ fontSize: 20 }} />,
  "General Physician": <UserOutlined style={{ fontSize: 20 }} />,
  "Dermatologist": <SkinOutlined style={{ fontSize: 20 }} />,
  "ENT Specialist": <SoundOutlined style={{ fontSize: 20 }} />,
  "Homoeopath": <ExperimentOutlined style={{ fontSize: 20 }} />,
  "Ayurveda": <MedicineBoxOutlined style={{ fontSize: 20 }} />,
  "Programming": <CodeOutlined style={{ fontSize: 20 }} />,
  "Nurse": <UserOutlined style={{ fontSize: 20 }} />,
};

const domainColors: Record<string, string> = {
  "Dentist": "#e6f7ff",
  "Gynecologist": "#fff0f6", 
  "General Physician": "#f6ffed",
  "Dermatologist": "#fffbe6",
  "ENT Specialist": "#f9f0ff",
  "Homoeopath": "#f0f5ff",
  "Ayurveda": "#f6ffed",
  "Programming": "#f0f5ff",
  "Nurse": "#fff0f6",
};

const trending = [
  "Dentist",
  "Gynecologist", 
  "General Physician",
  "Dermatologist",
  "ENT Specialist",
  "Homoeopath",
  "Ayurveda",
  "Programming"
];

// ========== Component ==========
export default function TestsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const carouselRef = useRef<any>(null);
  const router = useRouter();

  // Filter tests based on active tab
  const getFilteredTests = () => {
    if (activeTab === "doctors") {
      return allTests.filter(test => 
        test.domain !== "Programming" && test.domain !== "Nurse"
      );
    } else if (activeTab === "programming") {
      return allTests.filter(test => test.domain === "Programming");
    } else {
      return allTests.filter(test => test.domain === "Nurse");
    }
  };

  const testData = getFilteredTests();

  const filteredTests = selectedDomain
    ? testData.filter((test) => test.domain === selectedDomain)
    : testData;

  const handleStartTest = (test: Test) => {
    // Store complete test data including questions
    sessionStorage.setItem('currentTest', JSON.stringify(test));
    sessionStorage.removeItem('testResults');
    sessionStorage.removeItem('userAnswers');
    sessionStorage.removeItem('testDifficulty');
    router.push("/tests/difficulty");
  };

  return (
    <div style={{ padding: "40px 80px" }}>
      {/* Hero Section */}
      <Row gutter={32} align="middle" style={{ marginBottom: 60 }}>
        <Col xs={24} md={12}>
          <Title style={{ fontSize: 60, fontWeight: 700 }}>Unlock Perfection</Title>
          <Paragraph style={{ fontSize: 18, color: "#555" }}>
            Solve real-world medical problems & practice tests to get ready for your dream healthcare job!
          </Paragraph>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <Image
            src={hero}
            alt="Medical Hero"
            width={500}
            height={300}
            style={{ borderRadius: "10px", marginLeft: "50px" }}
          />
        </Col>
      </Row>

      {/* Trending Domains */}
      <Title level={3} style={{ marginBottom: 20 }}>
        Trending Domains
      </Title>
      <Row
        gutter={[12, 12]}
        style={{
          marginBottom: 50,
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        {trending.map((item) => (
          <Col key={item}>
            <Tag
              // onClick={() => setSelectedDomain(item)}
              color={selectedDomain === item ? "blue" : undefined}
              style={{
                fontSize: 15,
                padding: "12px 12px",
                cursor: "pointer",
                borderRadius: 30,
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: domainColors[item],
              }}
            >
              {domainIcons[item]} {item}
            </Tag>
          </Col>
        ))}
      </Row>

      {/* Mock Tests Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={3} style={{ margin: 0, fontSize: "40px", fontWeight: "700" }}>
          AI-Powered Mock Tests
        </Title>
        <div>
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current?.prev()}
            style={{ marginRight: 10 }}
          />
          <Button shape="circle" icon={<RightOutlined />} onClick={() => carouselRef.current?.next()} />
        </div>
      </Row>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          setSelectedDomain(null);
        }}
        items={[
          { 
            key: "doctors", 
            label: <span style={{ fontSize: 18, fontWeight: activeTab === "doctors" ? 600 : 400 }}>
              <UserOutlined /> Doctors & Specialists
            </span> 
          },
          { 
            key: "programming", 
            label: <span style={{ fontSize: 18, fontWeight: activeTab === "programming" ? 600 : 400 }}>
              <CodeOutlined /> Programming
            </span> 
          },
          { 
            key: "nursing", 
            label: <span style={{ fontSize: 18, fontWeight: activeTab === "nursing" ? 600 : 400 }}>
              <UserOutlined /> Nursing
            </span> 
          },
        ]}
        style={{ marginBottom: 30 }}
      />

      {/* Carousel with 4 cards per row */}
      <div style={{ margin: "0 -10px" }}>
        <Carousel
          dots={false}
          ref={carouselRef}
          slidesToShow={4}
          slidesToScroll={1}
          infinite={false}
        >
          {filteredTests.map((test) => (
            <div key={test.id} style={{ display:"flex", gap:"20px",  padding: "0 10px" }}>
              <Card
                hoverable
                style={{
                  maxWidth: "260px",
                  display: "flex",
                  gap:"20px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <div style={{ 
                    height: 200, 
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 48
                  }}>
                    {domainIcons[test.domain]}
                  </div>
                }
                actions={[
                  <Button
                    key="start-test"
                    type="link"
                    onClick={() => handleStartTest(test)}
                    icon={<PlayCircleOutlined style={{ fontSize: 20 }} />}
                    style={{
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    className="start-btn"
                  >
                    Start Test
                  </Button>,
                ]}
              >
                <Card.Meta 
                  title={test.title} 
                  description={
                    <div>
                      <p>{test.desc}</p>
                      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                        <div>{test.totalQuestions} questions • {test.duration} mins</div>
                        <div style={{ marginTop: 4 }}>
                          {Array.from(new Set(test.questions.map(q => q.type))).slice(0, 3).map(type => (
                            <Tag key={type} style={{ margin: '2px', fontSize: '12px', padding: '2px 6px' }}>
                              {type}
                            </Tag>
                          ))}
                        </div>
                        <div style={{ marginTop: 4 }}>
                          <Tag color={
                            test.questions.some(q => q.difficulty === 'hard') ? 'red' :
                            test.questions.some(q => q.difficulty === 'medium') ? 'orange' : 'green'
                          }>
                            {test.questions.some(q => q.difficulty === 'hard') ? 'Advanced' :
                             test.questions.some(q => q.difficulty === 'medium') ? 'Intermediate' : 'Beginner'}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  } 
                />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}