"use client";

import { Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/med-cert-logo.jpg";

/** --- Types (defined BEFORE FooterProps) --- */
type Lang = "en" | "ar";

type FooterLinksMap = {
  medCertBusiness: string;
  teach: string;
  app: string;
  about: string;
  contact: string;
  careers: string;
  blog: string;
  help: string;
  affiliate: string;
  investors: string;
  terms: string;
  privacy: string;
  cookies: string;
  sitemap: string;
  accessibility: string;
};

type FooterDict = {
  company: string;
  resources: string;
  legal: string;
  links: FooterLinksMap;
  language: Record<Lang, string>;
  copyright: string;
};

type Dict = {
  footer: FooterDict;
};

type FooterProps = {
  dict: Dict;
  lang: Lang;
};

/** --- Component --- */
export default function Footer({ dict, lang }: FooterProps) {
  const year = new Date().getFullYear();

  // Build the groups using the typed dict
  const footerGroups = [
    {
      title: dict.footer.company,
      items: [
        { label: dict.footer.links.medCertBusiness, href: "#" },
        { label: dict.footer.links.teach, href: "#" },
        { label: dict.footer.links.app, href: "#" },
        { label: dict.footer.links.about, href: "#" },
        { label: dict.footer.links.contact, href: "#" },
      ],
    },
    {
      title: dict.footer.resources,
      items: [
        { label: dict.footer.links.careers, href: "#" },
        { label: dict.footer.links.blog, href: "#" },
        { label: dict.footer.links.help, href: "#" },
        { label: dict.footer.links.affiliate, href: "#" },
        { label: dict.footer.links.investors, href: "#" },
      ],
    },
    {
      title: dict.footer.legal,
      items: [
        { label: dict.footer.links.terms, href: "#" },
        { label: dict.footer.links.privacy, href: "#" },
        { label: dict.footer.links.cookies, href: "#" },
        { label: dict.footer.links.sitemap, href: "#" },
        { label: dict.footer.links.accessibility, href: "#" },
      ],
    },
  ];

  return (
      <footer className="bg-[var(--section-bg-1)] border-t border-[var(--section-border)] text-[var(--section-text)] px-8 md:px-36 py-12">
        <div className=" max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerGroups.map((group, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-3">{group.title}</h4>
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
            {/* <div className="flex items-start md:items-end justify-start md:justify-end">
              <Button
                icon={<GlobalOutlined />}
                className="!border !border-[var(--section-text)] !bg-transparent !text-[var(--section-text)] hover:!bg-[var(--section-bg-3)]"
              >
                {dict.footer.language[lang]}
              </Button>
            </div> {if you uncomment this you have to change md:grid-cols-3 to md: grid-cols-4} */}
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
            <Link href="/">
              <Image src={logo} alt="Med-Cert logo" width={120} height={40} className="h-auto" />
            </Link>
            <div className="text-sm">
              {dict.footer.copyright.replace("{year}", String(year))}
            </div>
          </div>
        </div>
      </footer>
  );
}
