"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu } from "antd";
import { adminSidebarItems } from "@/utils/sidebaritems";
import { DashboardOutlined, FileTextOutlined, CopyOutlined} from "@ant-design/icons";
import "@/app/global.css";

const { Sider } = Layout;
const LOCAL_STORAGE_KEY = "medCert";

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <DashboardOutlined twoToneColor="#0077b6" />,
  "Courses": <FileTextOutlined className="text-lg font-bold hover:text-[#0077b6]" />,
  "Tests": <CopyOutlined className="text-lg font-bold hover:text-[#0077b6]" />,
  "Users": <FileTextOutlined className="text-lg font-bold hover:text-[#0077b6]" />,

};

export default function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const adminbarItems = user?.role === "admin" ? adminSidebarItems : [];
  const [selectedKey, setSelectedKey] = useState(adminbarItems[0]?.path);


  return (
    <>
      <div
        className={`text-xl font-bold text-white py-4 px-4 h-3 transition-all duration-300 ${collapsed ? "text-center text-base px-2 group-hover:text-[#0077b6]" : ""
          }`}
        style={{
          background: "var(--sidebar-bg)",
          borderBottom: "1px solid var(--section-border)",
           flex: "0 0 auto",
        }}
      >
        {collapsed ? "M+" : "Med + Cert"}

      </div>
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
          borderRight: "none",
        }}
        items={adminbarItems.flatMap((item, index) => {
          const menuItem = {
            key: item.path,
            icon: iconMap[item.label],
            label: item.label,
          };

          if (index < adminbarItems.length - 1) {
            return [menuItem, { type: "divider" as const, className: "custom-divider" }];
          }
          return [menuItem];
        })}
      />
    </>
  )
}