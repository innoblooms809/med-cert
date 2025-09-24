'use client';
import React, { useState } from "react";
import { Drawer, Dropdown, Badge, MenuProps } from "antd";
import { 
  MenuOutlined, 
  SearchOutlined, 
  ShoppingCartOutlined, 
  CloseOutlined,
  DownOutlined
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cartContext";
import logo from '../../public/images/med-cert-logo.jpg'

export default function NavBar({dict}:any) {
  const { cartItems } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  const categoriesItems: MenuProps['items'] = [
    { key: 'dentist', label: <Link href="#courses">Dentist</Link> },
    { key: 'gynecologist', label: <Link href="#courses">Gynecologist/obstetrician</Link> },
    { key: 'physician', label: <Link href="#courses">General Physician</Link> },
    { key: 'dermatologist', label: <Link href="#courses">Dermatologist</Link> },
    { key: 'ent', label: <Link href="#courses">Ear-nose-throat (ent) specialist</Link> },
    { key: 'homoeopath', label: <Link href="#courses">Homoeopath</Link> },
    { key: 'ayurveda', label: <Link href="#courses">Ayurveda</Link> },
  ];

  const mobileMenuItems = [
    { label: <Link href="#courses">Categories</Link>, key: 'categories' },
    { label: <Link href="/mockquiz">Get Certified</Link>, key: 'certified' },
    { label: <Link href="/login">Log in</Link>, key: 'login' },
    { label: <Link href="/signup">Sign up</Link>, key: 'signup' },
  ];

  return (
    <>
      <nav className="shadow-md py-2 px-4 z-50 bg-white sticky top-0">
        <ul className="h-full w-full p-0 m-0 list-none flex items-center justify-between gap-2">
          {/* Hamburger Menu - Mobile */}
          <li className="md:hidden flex">
            <button 
              type="button" 
              onClick={toggleSidebar}
              className="flex items-center justify-center bg-transparent border-none cursor-pointer p-2"
              aria-label="Open menu"
            >
              <MenuOutlined className="text-lg" />
            </button>
          </li>

          {/* Logo */}
          <li className="flex-shrink-0">
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
          </li>

          {/* Categories Dropdown - Tablet+ */}
          <li className="hidden md:flex relative">
            <Dropdown 
              menu={{ items: categoriesItems }} 
              placement="bottomLeft"
              trigger={['hover', 'click']}
            >
              <button
                type="button"
                className="bg-transparent border-none text-base cursor-pointer px-3 py-2 flex items-center hover:text-blue-600 transition-colors"
              >
                Categories <DownOutlined className="ml-1" />
              </button>
            </Dropdown>
          </li>

          {/* Search Button - Mobile */}
          <li className="md:hidden flex">
            <button 
              type="button" 
              className="flex items-center justify-center bg-transparent border-none cursor-pointer p-2"
              aria-label="Search"
            >
              <SearchOutlined className="text-lg" />
            </button>
          </li>

          {/* Get Certified Button - Desktop */}
          <li className="hidden lg:flex">
            <Link href="/mockquiz" className="inline-block rounded text-sm font-medium text-gray-900 bg-white transition-all hover:bg-gray-900 hover:text-white">
              <button 
                type="button" 
                className="bg-transparent border-none min-w-28 cursor-pointer px-4 py-2 font-semibold"
              >
                Get Certified
              </button>
            </Link>
          </li>

          {/* Cart Button */}
          <li className="relative">
            <Link href="/cart">
              <button 
                type="button" 
                className="flex items-center justify-center bg-transparent border-none cursor-pointer p-2 relative"
                aria-label={`Shopping cart with ${cartItems.length} items`}
              >
                <Badge 
                  count={cartItems.length} 
                  size="small" 
                  style={{ backgroundColor: 'red' }}
                  offset={[-8, -5]}
                  showZero={false}
                >
                  <ShoppingCartOutlined className="text-xl" />
                </Badge>
              </button>
            </Link>
          </li>

          {/* Login Button - Tablet+ */}
          <li className="hidden md:flex">
            <Link href="/login">
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
        </ul>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleSidebar}
        open={isSidebarOpen}
        width={300}
        closeIcon={<CloseOutlined />}
        className="md:hidden"
      >
        <ul className="list-none p-0 mt-8 space-y-4">
          {mobileMenuItems.map((item) => (
            <li key={item.key} className="my-4">
              {React.cloneElement(item.label as React.ReactElement, {
                onClick: toggleSidebar,
                className: "text-gray-700 text-lg font-medium no-underline hover:text-gray-900 block py-2"
              })}
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
};
