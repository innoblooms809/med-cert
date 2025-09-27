"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "@/app/global.css";

const { Header, Sider, Content } = Layout;
const LOCAL_STORAGE_KEY = "medCert";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<"admin" | "user">("admin"); // default to admin

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const simplifiedRole = user.role === "admin" ? "admin" : "user";
        setRole(simplifiedRole);
      }
    }
  }, []);

  const themeClass = `${role}-theme`;

  return (
    <Layout className={themeClass} style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
        width={250}
        style={{
          background: "var(--sidebar-bg)",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          overflow: "hidden",
          
        }}
      >
        <div
          style={{
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <AdminSidebar collapsed={collapsed} />
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.3s",
          backgroundColor: "var(--layout-bg)",
        }}
      >
        <Header
          style={{
            background: "var(--header-bg)",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AdminHeader onToggleSidebar={() => setCollapsed(!collapsed)} />
        </Header>

        <Content
          style={{
            margin: "12px 8px 0",
            padding: 12,
            background: "var(--content-bg)",
            color: "var(--section-text)",
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
