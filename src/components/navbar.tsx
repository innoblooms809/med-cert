"use client";
import React, { useState } from "react";
import { Drawer, Dropdown, Badge, MenuProps, Input, Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  DownOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cartContext";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../public/images/med-cert-logo.jpg";

type Lang = "en" | "ar";

interface NavBarProps {
  dict: {
    navbar: {
      categories: string;
      searchPlaceholder: string;
      login: string;
      signup: string;
      cart: string;
      Dentist: string;
      Gynecologist: string;
      GeneralPhysician: string;
      Dermatologist: string;
      ENTSpecialist: string;
      Homoeopath: string;
      Ayurveda: string;
    };
  };
  lang: Lang;
}

export default function NavBar({ dict, lang }: NavBarProps) {
  const { cartItems } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Improved language switching function
  const switchLanguage = (newLang: Lang) => {
    // Remove current language prefix from pathname
    const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "") || "/";
    
    // Navigate to the same path with new language
    router.push(`/${newLang}${pathWithoutLang}`);
  };

  const categoriesItems: MenuProps["items"] = [
    { key: "dentist", label: <Link href={`/${lang}/courses`}>{dict.navbar.Dentist}</Link> },
    { key: "gynecologist", label: <Link href={`/${lang}/courses`}>{dict.navbar.Gynecologist}</Link> },
    { key: "physician", label: <Link href={`/${lang}/courses`}>{dict.navbar.GeneralPhysician}</Link> },
    { key: "dermatologist", label: <Link href={`/${lang}/courses`}>{dict.navbar.Dermatologist}</Link> },
    { key: "ent", label: <Link href={`/${lang}/courses`}>{dict.navbar.ENTSpecialist}</Link> },
    { key: "homoeopath", label: <Link href={`/${lang}/courses`}>{dict.navbar.Homoeopath}</Link> },
    { key: "ayurveda", label: <Link href={`/${lang}/courses`}>{dict.navbar.Ayurveda}</Link> },
  ];

  const mobileMenuItems: { key: string; label: React.ReactElement }[] = [
    { label: <Link href={`/${lang}/courses`}>{dict.navbar.categories}</Link>, key: "categories" },
    { label: <Link href={`/${lang}/auth/login`}>{dict.navbar.login}</Link>, key: "login" },
    { label: <Link href={`/${lang}/auth/signUp`}>{dict.navbar.signup}</Link>, key: "signup" },
  ];

  const switchLang = lang === "en" ? "ar" : "en";

  return (
    <>
      <nav className="shadow-md py-2 px-4 z-50 bg-white sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Left Section: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center p-2"
              aria-label="Open menu"
            >
              <MenuOutlined className="text-lg" />
            </button>

            <Link href={`/${lang}`}>
              <Image
                src={logo}
                alt="med-cert-logo"
                width={160}
                height={40}
                className="w-32 h-auto md:w-40"
                priority
              />
            </Link>

            {/* Categories dropdown (desktop only) */}
            <div className="hidden md:flex">
              <Dropdown
                menu={{ items: categoriesItems }}
                placement="bottomLeft"
                trigger={["hover", "click"]}
              >
                <button
                  type="button"
                  className="px-3 py-2 flex items-center text-base hover:text-blue-600 transition-colors"
                >
                  {dict.navbar.categories} <DownOutlined className="ml-1" />
                </button>
              </Dropdown>
            </div>
          </div>

          {/* Middle Section: Search bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.navbar.searchPlaceholder}
              prefix={<SearchOutlined />}
              className="max-w-md rounded-md"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href={`/${lang}/cart`}>
              <Badge
                count={cartItems.length}
                size="small"
                style={{ backgroundColor: "red" }}
                offset={[-5, 5]}
                showZero={false}
              >
                <ShoppingCartOutlined className="text-xl cursor-pointer" />
              </Badge>
            </Link>

            {/* Language Switch */}
            <Button
              icon={<GlobalOutlined />}
              className="!border !border-gray-400 !bg-transparent !text-gray-700 hover:!bg-gray-100"
              onClick={() => switchLanguage(switchLang)}
            >
              {lang === "en" ? "عربي" : "English"}
            </Button>

            {/* Auth links (desktop only) */}
            <div className="hidden md:flex">
              <Link href={`/${lang}/auth/login`}>
                <button
                  type="button"
                  className="border border-black font-bold text-base px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {dict.navbar.login}
                </button>
              </Link>
            </div>
            <div className="hidden md:flex">
              <Link href={`/${lang}/auth/signUp`}>
                <button
                  type="button"
                  className="bg-black text-white font-bold text-base px-3 py-1.5 cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  {dict.navbar.signup}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleSidebar}
        open={isSidebarOpen}
        width={280}
        closeIcon={<CloseOutlined />}
        className="md:hidden"
      >
        <ul className="mt-6 space-y-4">
          {mobileMenuItems.map((item) => (
            <li key={item.key}>
              {React.cloneElement(item.label as React.ReactElement<any>, {
                onClick: toggleSidebar,
                className:
                  "block text-gray-700 text-lg font-medium hover:text-gray-900",
              })}
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
