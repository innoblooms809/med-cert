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
import { useRouter } from "next/navigation";
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

// Test data with questions and timing
const doctorTests = [
  { 
    id: "dentist-mock", 
    title: "Dentist Mock Test", 
    desc: "Practice dentistry questions.", 
    domain: "Dentist", 
    img: dentist, 
    totalQuestions: 5, 
    duration: 10,
    questions: [
      {
        id: 1,
        question: "What is the primary cause of dental caries?",
        options: ["Bacteria and sugar", "Viruses", "Fungi", "Genetic factors"],
        correctAnswer: "Bacteria and sugar",
        explanation: "Dental caries are primarily caused by bacteria in dental plaque metabolizing sugars and producing acids that demineralize tooth enamel."
      },
      {
        id: 2,
        question: "Which tooth is most commonly affected by periodontal disease?",
        options: ["Incisors", "Canines", "Premolars", "First molars"],
        correctAnswer: "First molars",
        explanation: "First molars are most commonly affected due to their early eruption and complex anatomy."
      },
      {
        id: 3,
        question: "What is the recommended fluoride concentration in toothpaste for adults?",
        options: ["250-500 ppm", "1000-1500 ppm", "2000-2500 ppm", "5000+ ppm"],
        correctAnswer: "1000-1500 ppm",
        explanation: "1000-1500 ppm fluoride is recommended for effective caries prevention in adults."
      },
      {
        id: 4,
        question: "Which dental material is most commonly used for permanent crowns?",
        options: ["Amalgam", "Composite resin", "Porcelain-fused-to-metal", "Glass ionomer"],
        correctAnswer: "Porcelain-fused-to-metal",
        explanation: "PFM crowns provide both strength and aesthetics for permanent restorations."
      },
      {
        id: 5,
        question: "What is the normal probing depth for healthy gingiva?",
        options: ["1-3 mm", "4-5 mm", "6-7 mm", "8+ mm"],
        correctAnswer: "1-3 mm",
        explanation: "Healthy gingiva typically has probing depths of 1-3 mm without bleeding."
      }
    ]
  },
  { 
    id: "gynecologist-mock", 
    title: "Gynecologist Mock Test", 
    desc: "Test your knowledge in gynecology.", 
    domain: "Gynecologist", 
    img: gyneco, 
    totalQuestions: 4, 
    duration: 8,
    questions: [
      {
        id: 1,
        question: "What is the normal duration of a menstrual cycle?",
        options: ["21-35 days", "14-21 days", "35-42 days", "42-50 days"],
        correctAnswer: "21-35 days",
        explanation: "A normal menstrual cycle typically ranges from 21 to 35 days."
      },
      {
        id: 2,
        question: "Which hormone is primarily responsible for ovulation?",
        options: ["Estrogen", "Progesterone", "Luteinizing Hormone (LH)", "Follicle Stimulating Hormone (FSH)"],
        correctAnswer: "Luteinizing Hormone (LH)",
        explanation: "LH surge triggers ovulation approximately 24-36 hours after its peak."
      },
      {
        id: 3,
        question: "What is the first-line treatment for uncomplicated urinary tract infection in women?",
        options: ["Nitrofurantoin", "Ciprofloxacin", "Amoxicillin", "Doxycycline"],
        correctAnswer: "Nitrofurantoin",
        explanation: "Nitrofurantoin is recommended as first-line treatment for uncomplicated UTIs due to its efficacy and low resistance."
      },
      {
        id: 4,
        question: "At what age should cervical cancer screening typically begin?",
        options: ["18 years", "21 years", "25 years", "30 years"],
        correctAnswer: "21 years",
        explanation: "Cervical cancer screening should begin at age 21 regardless of sexual activity."
      }
    ]
  },
  { 
    id: "cardiology-basics", 
    title: "Cardiology Basics", 
    desc: "Fundamentals of cardiology.", 
    domain: "General Physician", 
    img: cardio, 
    totalQuestions: 6, 
    duration: 12,
    questions: [
      {
        id: 1,
        question: "What is the normal resting heart rate for adults?",
        options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
        correctAnswer: "60-100 bpm",
        explanation: "Normal resting heart rate for adults ranges from 60 to 100 beats per minute."
      },
      {
        id: 2,
        question: "Which chamber of the heart receives oxygenated blood from lungs?",
        options: ["Right Atrium", "Left Atrium", "Right Ventricle", "Left Ventricle"],
        correctAnswer: "Left Atrium",
        explanation: "Left atrium receives oxygenated blood from pulmonary veins."
      },
      {
        id: 3,
        question: "What is the most common cause of myocardial infarction?",
        options: ["Coronary artery spasm", "Coronary artery thrombosis", "Cardiomyopathy", "Valvular heart disease"],
        correctAnswer: "Coronary artery thrombosis",
        explanation: "Coronary artery thrombosis leading to acute plaque rupture is the most common cause."
      },
      {
        id: 4,
        question: "Which medication is first-line for stable angina?",
        options: ["Beta-blockers", "Calcium channel blockers", "Nitrates", "ACE inhibitors"],
        correctAnswer: "Beta-blockers",
        explanation: "Beta-blockers are first-line for stable angina as they reduce myocardial oxygen demand."
      },
      {
        id: 5,
        question: "What ECG finding is characteristic of atrial fibrillation?",
        options: ["P waves present", "Irregularly irregular rhythm", "PR interval prolongation", "QRS widening"],
        correctAnswer: "Irregularly irregular rhythm",
        explanation: "Atrial fibrillation shows irregularly irregular rhythm with absent P waves."
      },
      {
        id: 6,
        question: "Normal blood pressure is classified as:",
        options: ["<120/80 mmHg", "<130/85 mmHg", "<140/90 mmHg", "<150/95 mmHg"],
        correctAnswer: "<120/80 mmHg",
        explanation: "Normal blood pressure is defined as systolic <120 mmHg and diastolic <80 mmHg."
      }
    ]
  },
  { 
    id: "general-medicine", 
    title: "General Medicine", 
    desc: "General medical knowledge.", 
    domain: "General Physician", 
    img: gene, 
    totalQuestions: 3, 
    duration: 6,
    questions: [
      {
        id: 1,
        question: "What is the first-line treatment for type 2 diabetes?",
        options: ["Insulin", "Metformin", "Sulfonylureas", "GLP-1 agonists"],
        correctAnswer: "Metformin",
        explanation: "Metformin is the first-line pharmacological treatment for type 2 diabetes."
      },
      {
        id: 2,
        question: "Which vitamin deficiency causes megaloblastic anemia?",
        options: ["Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin K"],
        correctAnswer: "Vitamin B12",
        explanation: "Vitamin B12 deficiency impairs DNA synthesis, leading to megaloblastic anemia."
      },
      {
        id: 3,
        question: "Normal body temperature in Celsius is:",
        options: ["36.5°C", "37.0°C", "37.5°C", "38.0°C"],
        correctAnswer: "37.0°C",
        explanation: "Normal human body temperature is approximately 37.0°C (98.6°F)."
      }
    ]
  }
];

const nurseTests = [
  {
    id: "nursing-fundamentals",
    title: "Nursing Fundamentals",
    desc: "Core concepts for nurses.",
    domain: "Nurse",
    img: "/images/nurse1.jpg",
    totalQuestions: 4,
    duration: 8,
    questions: [
      {
        id: 1,
        question: "What is the normal range for adult blood pressure?",
        options: ["<120/80 mmHg", "<130/85 mmHg", "<140/90 mmHg", "<150/95 mmHg"],
        correctAnswer: "<120/80 mmHg",
        explanation: "Normal blood pressure for adults is less than 120/80 mmHg."
      },
      {
        id: 2,
        question: "Which vein is most commonly used for venipuncture?",
        options: ["Basilic vein", "Cephalic vein", "Median cubital vein", "Jugular vein"],
        correctAnswer: "Median cubital vein",
        explanation: "Median cubital vein is preferred due to its size and stability."
      }
    ]
  }
];

// ========== Component ==========
export default function TestsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("doctor");
  const carouselRef = useRef<any>(null);
  const router = useRouter();

  const testData = activeTab === "doctor" ? doctorTests : nurseTests;

  const filteredTests = selectedDomain
    ? testData.filter((test) => test.domain === selectedDomain)
    : testData;

  const handleStartTest = (test: any) => {
    // Store complete test data including questions
    sessionStorage.setItem('currentTest', JSON.stringify(test));
    sessionStorage.removeItem('testResults'); // Clear previous results
    sessionStorage.removeItem('userAnswers'); // Clear previous answers
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
                      <p style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                        {test.totalQuestions} questions • {test.duration} mins
                      </p>
                    </div>
                  } 
                />
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