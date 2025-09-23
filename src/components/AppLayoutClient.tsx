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
  const isDhaRoute = pathname.startsWith(`/${lang}/dha`);
  const isFacilityRoute = pathname.startsWith(`/${lang}/facility`);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dict?.dir || (lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  return (
    <>
      {(!isAdminRoute && !isDhaRoute  && !isFacilityRoute)&& <Navbar dict={dict} />}
      {children}
      {(!isAdminRoute && !isDhaRoute  && !isFacilityRoute) && <Footer dict={dict}/>}
    </>
  );
}
