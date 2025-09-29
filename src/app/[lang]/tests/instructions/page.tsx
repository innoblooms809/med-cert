"use client";

import { useState } from "react";
import { Typography, Button, Input, Row, Col } from "antd";
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function InstructionsPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleStart = () => {
    if (inputValue.toLowerCase() === "start") {
      router.push("/tests/exam");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, width: "100%" }}>
        <Row gutter={60} align="top">
          {/* LEFT SIDE */}
          <Col xs={24} md={10}>
            <div>
              <Title level={2} style={{ marginBottom: 30 }}>
                Boost Your Skill – Mock Test
              </Title>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <QuestionCircleOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Questions: <b>30</b>
                </Text>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FileTextOutlined style={{ fontSize: 20, marginRight: 10, color: "#555" }} />
                <Text style={{ fontSize: 16 }}>
                  Marks: <b>30</b>
                </Text>
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col xs={24} md={14}>
            <div>
              <Title level={4} style={{ marginBottom: 20 }}>
                <BulbOutlined style={{ marginRight: 10, color: "#faad14" }} /> Guidelines
              </Title>

              <div style={{ lineHeight: 1.9, fontSize: 16, color: "#333" }}>
                <p>
                  <b>Assessment Duration:</b> 00:30:00 (hh:mm:ss)
                </p>
                <p>
                  <b>Total Questions to be answered:</b> 30 Questions
                </p>
                <p>Do not close the window or tab if you wish to continue the application.</p>
                <p>
                  Please ensure that you attempt the assessment in one sitting, as once you
                  start the assessment, the timer won’t stop.
                </p>
              </div>

              {/* START SECTION */}
              <div style={{ display: "flex", marginTop: 30 }}>
                <Input
                  placeholder='Type "start" to Start'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ flex: 1, height: 45, fontSize: 16, borderRadius: "8px 0 0 8px" }}
                />
                <Button
                  type="primary"
                  size="large"
                  disabled={inputValue.toLowerCase() !== "start"}
                  onClick={handleStart}
                  style={{
                    height: 45,
                    fontSize: 16,
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  Start →
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

