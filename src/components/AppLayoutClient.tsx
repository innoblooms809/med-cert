"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect } from "react";


interface AppLayoutClientProps {
  children: React.ReactNode;
  dict:any;
  lang:any
}


export default  function AppLayoutClient({ lang, children,dict}: AppLayoutClientProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith(`/${lang}/admin`);
  const isUserRoute = pathname.startsWith(`/${lang}/user`);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dict?.dir || (lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return (
    <>
      {(!isAdminRoute && !isUserRoute )&& <Navbar dict={dict} lang={lang} />}
      {children}
      {(!isAdminRoute && !isUserRoute  ) && <Footer dict={dict}/>}
    </>
  );
}
