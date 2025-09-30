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
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import Image from "next/image";
import dentist from "@/../../public/images/pharma.jpg";
import gyneco from "@/../../public/images/artho.jpg";
import cardio from "@/../../public/images/cardiology.jpg";
import gene from "@/../../public/images/artho.jpg";
import derma from "@/../../public/images/pharma.jpg";
import ent from "@/../../public/images/ECG.jpeg";
import ayur from "@/../../public/images/artho.jpg";
import hero from "@/../../public/images/OIP.jpeg";

// ========== Data ==========
const { Title, Paragraph } = Typography;

const domainIcons: Record<string, React.ReactNode> = {
  Dentist: <SmileOutlined style={{ fontSize: 20 }} />,
  Gynecologist: <WomanOutlined style={{ fontSize: 20 }} />,
  "General Physician": <UserOutlined style={{ fontSize: 20 }} />,
  Dermatologist: <SkinOutlined style={{ fontSize: 20 }} />,
  "ENT Specialist": <SoundOutlined style={{ fontSize: 20 }} />,
  Homoeopath: <ExperimentOutlined style={{ fontSize: 20 }} />,
  Ayurveda: <MedicineBoxOutlined style={{ fontSize: 20 }} />,
};

const domainColors: Record<string, string> = {
  Dentist: "#e6f7ff",
  Gynecologist: "#fff0f6",
  "General Physician": "#f6ffed",
  Dermatologist: "#fffbe6",
  "ENT Specialist": "#f9f0ff",
  Homoeopath: "#f0f5ff",
  Ayurveda: "#f6ffed",
};

const trending = [
  "Dentist",
  "Gynecologist",
  "General Physician",
  "Dermatologist",
  "ENT Specialist",
  "Homoeopath",
  "Ayurveda",
];

const doctorTests = [
  { title: "Dentist Mock Test", desc: "Practice dentistry questions.", domain: "Dentist", img: dentist },
  { title: "Gynecologist Mock Test", desc: "Test your knowledge in gynecology.", domain: "Gynecologist", img: gyneco },
  { title: "Cardiology Basics", desc: "Fundamentals of cardiology.", domain: "General Physician", img: cardio },
  { title: "General Medicine", desc: "General medical knowledge.", domain: "General Physician", img: gene },
  { title: "Dermatology Essentials", desc: "Key concepts in dermatology.", domain: "Dermatologist", img: derma },
  { title: "ENT Specialist Mock Test", desc: "ENT case-based questions.", domain: "ENT Specialist", img: ent },
  { title: "Ayurveda Knowledge Test", desc: "Explore ayurveda fundamentals.", domain: "Ayurveda", img: ayur },
];

const nurseTests = [
  {
    title: "Nursing Fundamentals",
    desc: "Core concepts for nurses.",
    domain: "Nurse",
    img: "/images/nurse1.jpg",
  },
  {
    title: "Clinical Nursing",
    desc: "Clinical practice questions.",
    domain: "Nurse",
    img: "/images/nurse2.jpg",
  },
];

// ========== Component ==========
export default function TestsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("doctor");
  const carouselRef = useRef<any>(null);

  const testData = activeTab === "doctor" ? doctorTests : nurseTests;

  const filteredTests = selectedDomain
    ? testData.filter((test) => test.domain === selectedDomain)
    : testData;

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
            alt="Doctor Hero"
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
              onClick={() => setSelectedDomain(item)}
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
          { key: "doctor", label: <span style={{ fontSize: 18, fontWeight: activeTab === "doctor" ? 600 : 400 }}>Doctors</span> },
          { key: "nurse", label: <span style={{ fontSize: 18, fontWeight: activeTab === "nurse" ? 600 : 400 }}>Nurses</span> },
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
            <div key={test.title} style={{ display:"flex", gap:"20px",  padding: "0 10px" }}>
              <Card
                hoverable
                style={{
                  maxWidth: "260px",
                  // height: 450,
                  display: "flex",
                  gap:"20px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                cover={
                  <Image
                    src={test.img}
                    alt={test.title}
                    width={400}
                    height={200}
                    style={{ objectFit: "cover", height: 200 }}
                  />
                }
                actions={[
                  <Button
                    key="start-test"
                    type="link"
                    href="/tests/difficulty"
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
                <Card.Meta title={test.title} description={test.desc} />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Hover CSS */}
      <style jsx global>{`
        .start-btn:hover .anticon {
          background: #e6f7ff;
          border-radius: 50%;
          transform: scale(1.2);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
