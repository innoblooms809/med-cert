"use client";

import React from "react";
import Link from "next/link";

interface NavbarProps {
  dict: {
    Navheader: {
      categories: string;
      getCertified: string;
      login: string;
      signup: string;
      searchPlaceholder: string;
    };
  };
}

const NavBar = ({ dict }: NavbarProps) => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f8f8f8",
      }}
    >
      {/* Logo */}
      <Link href="/Med-cert/">
        <img src="/Med-cert/med-cert-logo.jpg" alt="med-cert-logo" width={120} />
      </Link>

      {/* Menu Links */}
      <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
        <li>
          <Link href="/categories">{dict.Navheader.categories}</Link>
        </li>
        <li>
          <Link href="/mockquiz">{dict.Navheader.getCertified}</Link>
        </li>
        <li>
          <Link href="/login">{dict.Navheader.login}</Link>
        </li>
        <li>
          <Link href="/signup">{dict.Navheader.signup}</Link>
        </li>
      </ul>

      {/* Search Box */}
      <input
        type="text"
        placeholder={dict.Navheader.searchPlaceholder}
        style={{
          padding: "6px 10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </nav>
  );
};

export default NavBar;
