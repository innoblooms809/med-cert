import type { Metadata } from "next";
import { getDictionary } from "./dictionaries"; // relative import within [lang] folder
import AppLayoutClient from "@/components/AppLayoutClient";
import "../globals.css";

export const metadata: Metadata = {
  title: "Smart Pro App",
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
  params: { lang: "en" | "ar" };
}) {
  const lang = params.lang === "ar" ? "ar" : "en";
  const dict = await getDictionary(lang);

  return (

        <AppLayoutClient dict={dict} lang={lang}>
          {children}
        </AppLayoutClient>

  )
}