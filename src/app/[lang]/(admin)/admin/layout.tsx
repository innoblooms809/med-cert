"use client";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "@/app/globals.css";


const { Header, Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState("admin"); // default role

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("dhaUser") || "{}");
      if (user?.role) {
        setRole(user.role); // Set theme based on user role
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
          overflow: "hidden", // prevent double scrollbars
        }}
      >
        <div
          style={{
            height: "100%",
            overflowY: "auto", // enables vertical scroll
            overflowX: "hidden",
          }}
        >
          {/* <AdminSidebar collapsed={collapsed} /> */}
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
          {/* <AdminHeader onToggleSidebar={() => setCollapsed(!collapsed)} /> */}
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
