"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu } from "antd";
import { adminSidebarItems } from "@/utils/sidebaritems";
import {
  DashboardOutlined,
  FileTextOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import "@/app/global.css";

const { Sider } = Layout;
const LOCAL_STORAGE_KEY = "medCert";

// Define sidebar item shape
interface SidebarItem {
  key: string; // used by Menu
  label: string;
  path: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <DashboardOutlined style={{ color: "var(--sidebar-text)" }} />,
  Courses: <FileTextOutlined />,
  Tests: <CopyOutlined />,
  Users: <FileTextOutlined />,
};

interface AdminSidebarProps {
  collapsed: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export default function AdminSidebar({ collapsed }: AdminSidebarProps) {
  // const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [adminbarItems, setAdminbarItems] = useState<SidebarItem[]>([]);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsedUser: User = JSON.parse(stored);
        // setUser(parsedUser);

        if (parsedUser.role === "admin") {
          setAdminbarItems(adminSidebarItems as SidebarItem[]);
          setSelectedKey(adminSidebarItems[0]?.path || "");
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      style={{
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        overflow: "hidden",
      }}
    >
      {/* Sidebar Header */}
      <div
        className={`text-xl font-bold text-white py-4 px-4 transition-all duration-300`}
        style={{
          textAlign: collapsed ? "center" : "left",
          background: "var(--sidebar-bg)",
          color: "var(--sidebar-text)",
          borderBottom: "1px solid var(--section-border)",
          fontSize: collapsed ? "1rem" : "1.25rem",
        }}
      >
        {collapsed ? "M+" : "Med + Cert"}
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        selectedKeys={[selectedKey]}
        onClick={({ key }) => {
          setSelectedKey(key);
          router.push(key);
        }}
        style={{
          background: "var(--sidebar-bg)",
          color: "var(--sidebar-text)",
          borderRight: "none",
          marginTop: 20,
        }}
        items={adminbarItems.flatMap((item, index) => {
          const menuItem = {
            key: item.path,
            icon: iconMap[item.label],
            label: item.label,
          };
          // Add divider after each item except last
          if (index < adminbarItems.length - 1) {
            return [
              menuItem,
              {
                type: "divider" as const,
                className: "custom-divider",
                style: { borderColor: "rgba(255,255,255,0.1)" },
              },
            ];
          }
          return [menuItem];
        })}
      />
    </Sider>
  );
}
