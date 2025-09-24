import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import AppLayoutClient from "@/components/AppLayoutClient";
import "../global.css";

export const metadata: Metadata = {
  title: "Med-Cert App",
  description: "Multilingual support with Next.js and Tailwind",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params; // ✅ works with Promise type
  const dict = await getDictionary(lang);

  return (
    <AppLayoutClient dict={dict} lang={lang}>
      {children}
    </AppLayoutClient>
  );
}

