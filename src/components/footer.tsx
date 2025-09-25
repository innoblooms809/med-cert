"use client";

import { Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/utils/data/links";
import logo from '../../public/images/med-cert-logo.jpg'

export default function Footer({dict}:any) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--section-bg-1)] border-t border-[var(--section-border)] text-[var(--section-text)] px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Links */}
        {footerLinks.map((group, idx) => (
          <div key={idx}>
            <ul className="space-y-2">
              {group.items.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="hover:text-[var(--section-primary)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Language switch */}
        <div className="flex justify-start md:justify-end">
          <Button
            icon={<GlobalOutlined />}
            className="!border !border-[var(--section-text)] !bg-transparent !text-[var(--section-text)] hover:!bg-[var(--section-bg-3)]"
          >
            English
          </Button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4  pt-6">
        <Link href="/">
          <Image
            src={logo}
            alt="Med-Cert logo"
            width={120}
            height={40}
            className="h-auto"
          />
        </Link>
        <div className="text-sm">© {year} Med-Cert, Inc.</div>
      </div>
    </footer>
  );
}
