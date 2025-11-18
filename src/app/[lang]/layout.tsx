import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import AppLayoutClient from "@/components/AppLayoutClient";
import "../global.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Med-Cert App",
  description: "Empowering healthcare professionals with certification courses",
  icons: {
    icon: `${basePath}/favicon.ico`,
    shortcut: `${basePath}/favicon.ico`,
    apple: `${basePath}/apple-touch-icon.png`,
    other: [
      { rel: "icon", url: `${basePath}/icon-32x32.png`, sizes: "32x32" },
      { rel: "icon", url: `${basePath}/icon-192x192.png`, sizes: "192x192" },
    ],
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

// 1. Define Props with params as a Promise
interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Use string for broader compatibility
}

export default async function LangLayout({ children, params }: Props) {
  // 2. Await the params Promise
  const { lang } = await params;
  // 3. Narrow down the type after awaiting
  const validLang = lang === "ar" ? "ar" : "en";
  const dict = await getDictionary(validLang);

  return (
    <AppLayoutClient dict={dict} lang={validLang}>
      {children}
    </AppLayoutClient>
  );
}