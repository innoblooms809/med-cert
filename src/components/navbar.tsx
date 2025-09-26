"use client";
import React, { useState } from "react";
import { Drawer, Dropdown, Badge, MenuProps } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cartContext";
import logo from "../../public/images/med-cert-logo.jpg";

interface NavBarProps {
  dict: any;
  lang: string;
}

export default function NavBar({ dict, lang }: NavBarProps) {
  const { cartItems } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const categoriesItems: MenuProps["items"] = [
    { key: "dentist", label: <Link href="#courses">Dentist</Link> },
    { key: "gynecologist", label: <Link href="#courses">Gynecologist</Link> },
    { key: "physician", label: <Link href="#courses">General Physician</Link> },
    { key: "dermatologist", label: <Link href="#courses">Dermatologist</Link> },
    { key: "ent", label: <Link href="#courses">ENT Specialist</Link> },
    { key: "homoeopath", label: <Link href="#courses">Homoeopath</Link> },
    { key: "ayurveda", label: <Link href="#courses">Ayurveda</Link> },
  ];

  const mobileMenuItems: { key: string; label: React.ReactElement }[] = [
    { label: <Link href="#courses">Categories</Link>, key: "categories" },
    { label: <Link href="/mockquiz">Get Certified</Link>, key: "certified" },
    { label: <Link href="/login">Log in</Link>, key: "login" },
    { label: <Link href="/signup">Sign up</Link>, key: "signup" },
  ];

  return (
    <>
      <nav className="shadow-md py-2 px-4 z-50 bg-white sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section: Hamburger + Logo */}
          <div className="flex items-center gap-2">
            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center p-2"
              aria-label="Open menu"
            >
              <MenuOutlined className="text-lg" />
            </button>

            {/* Logo */}
            <Link href="/">
              <Image
                src={logo}
                alt="med-cert-logo"
                width={160}
                height={40}
                className="w-32 h-auto md:w-40"
                priority
              />
            </Link>
            {/* Middle Section: Categories dropdown (desktop only) */}
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
                  Categories <DownOutlined className="ml-1" />
                </button>
              </Dropdown>
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-3">
            {/* Search (mobile) */}
            <button type="button" className="md:hidden p-2" aria-label="Search">
              <SearchOutlined className="text-lg" />
            </button>

            {/* Get Certified (desktop) */}
            <Link
              href="/mockquiz"
              className="hidden lg:inline-block rounded font-medium bg-white hover:bg-gray-900 hover:text-white transition-all"
            >
              <button type="button" className="px-4 py-2 font-semibold text-sm">
                Get Certified
              </button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
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

            {/* Login Button - Tablet+ */}
            {/* Login Button - Tablet+ */}
            <li className="hidden md:flex">
              <Link href={`/${lang}/auth/login`}>
                <button
                  type="button"
                  className="border border-black font-bold text-base px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Log in
                </button>
              </Link>
            </li>

            {/* Signup Button - Tablet+ */}
            <li className="hidden md:flex">
              <Link href="/signup">
                <button
                  type="button"
                  className="bg-black text-white font-bold text-base px-3 py-1.5 cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  Sign up
                </button>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
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
