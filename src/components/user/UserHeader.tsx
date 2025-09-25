"use client";
import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Dropdown,
  Input,
  List,
  Space,
  Typography,
  Menu,
  Button,
} from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Search } = Input;
const { Text } = Typography;

const userMenu = {
  items: [
    {
      key: "profile",
      label: <Link href="/user/myProfile">Profile</Link>,
    },
    // {
    //   key: "settings",
    //   label: <Link href="/facility/settings">Settings</Link>,
    // },
    {
      key: "logout",
      label: <Link href="/auth/login">Logout</Link>,
    },
  ],
};

export default function UserHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const router = useRouter();
  const [complianceReports, setComplianceReports] = useState<any[]>([]);

  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  
  // const handleSearch = (value: string) => {
  //   setQuery(value);
  //   if (value.trim()) {
  //     const filtered = searchableItemsOfFacility.filter(item =>
  //       item.label.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setResults(filtered.length ? filtered : [{ label: "No results found", link: null }]);
  //   } else {
  //     setResults([]);
  //   }
  // };

  useEffect(() => {
    const reports = localStorage.getItem("complianceReports");
    if (reports) {
      setComplianceReports(JSON.parse(reports));
    }
  }, []);

  // const complianceLabelMap: Record<string, string> = {
  //   RC: "Regulatory Compliance",
  //   CPSC: "Clinical & Patient Safety Compliance",
  //   CDC: "Cybersecurity & Data Compliance",
  //   FBC: "Fraud & Billing Compliance",
  //   OWC: "Occupational & Workplace Compliance",
  //   TDHC: "Telemedicine & Digital Health Compliance",
  //   PRC: "Pharmaceutical & Research Compliance",
  // };

  const staticComplianceReports = [
    {
      key: 1,
      compliance: "Regulatory Compliance",
      date: "2025-08-15",
    },
    {
      key: 2,
      compliance: "Clinical & Patient Safety Compliance",
      date: "2025-08-16",
    },
    {
      key: 3,
      compliance: "Cybersecurity & Data Compliance",
      date: "2025-08-18",
    },
    {
      key: 4,
      compliance: "Fraud & Billing Compliance",
      date: "2025-08-18",
    },
    {
      key: 5,
      compliance: "Occupational & Workplace Compliance",
      date: "2025-08-18",
    },
    {
      key: 6,
      compliance: "Telemedicine & Digital Health Complianc",
      date: "2025-08-18",
    },
    {
      key: 7,
      compliance: "Pharmaceutical & Research Compliance",
      date: "2025-08-18",
    },
  ];
  const finalReports = [...staticComplianceReports];

  const notificationOverlay = (
    <div
      style={{
        width: 300,
        maxHeight: 300,
        overflowY: "auto",
        padding: 8,
        backgroundColor: "var(--dropdown-bg)",
        color: "var(--dropdown-text)",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={finalReports.slice(0,3)}
        renderItem={(item) => (
          <List.Item
            onClick={() => router.push("/facility/notification")}
            style={{
              cursor: "pointer",
              borderBottom: "1px solid var(--dropdown-divider)",
            }}
          >
            <List.Item.Meta
              title={
                <Text style={{ color: "var(--dropdown-text)" }}>
                  { item.compliance}
                </Text>
              }
              description={
                <Text
                  style={{ color: "var(--dropdown-subtext)" }}
                  type="secondary"
                >
                  {item.date}
                </Text>
              }
            />
          </List.Item>
        )}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          borderTop: "1px solid var(--dropdown-divider)",
          paddingTop: 8,
        }}
      >
        <Link
          style={{ color: "var(--dropdown-link)" }}
          href="/facility/notification"
        >
          View all
        </Link>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "64px",
        backgroundColor: "var(--header-bg)",
        color: "var(--header-text)",
        gap: 16,
        width: "100%",
      }}
    >
      {/* Sidebar Toggle & Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <MenuOutlined
          onClick={onToggleSidebar}
          style={{
            fontSize: 20,
            color: "var(--header-text)",
            cursor: "pointer",
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 1,
            color: "var(--header-text)",
          }}
        >
          {/* Al Zahra Hospital */}
        </span>
      </div>

      {/* Search Bar */}
      {/* <Seacrhbar handleSearch={handleSearch} query={query} setQuery={setQuery} results={results} setResults={setResults} /> */}

      {/* Notifications & User */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Dropdown
          popupRender={() => notificationOverlay}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Badge count={finalReports.slice(0,3).length} offset={[0, 6]}>
            <BellOutlined
              style={{
                fontSize: 30,
                color: "var(--header-text)",
                cursor: "pointer",
              }}
            />
          </Badge>
        </Dropdown>

        <Dropdown menu={userMenu} placement="bottomRight">
          <Space style={{ cursor: "pointer", color: "var(--header-text)" }}>
            <Image
              src="../../public/images/med-cert-logo.jpg"
              alt="Doctor"
              width={100}
              height={100}
              className="rounded-full w-10 h-10 object-cover"
            />
          </Space>
        </Dropdown>
      </div>
    </div>
  );
}
