import Hero from "@/components/hero";
import { getDictionary } from "../[lang]/dictionaries";
import Contact from "@/components/contact";
import NavBar from "@/components/navbar";
import LoginForm from "@/components/LoginForm";


export type PageProps = {
  params: {
    lang: "en" | "ar";
  };
};


export default async function Page({
  params,
}: any) {
   const {lang} = await params;                                                                                                                                                                 
   const dict = await getDictionary(params.lang); 
  return (
    <>
      {/* <Hero dict={dict} /> */}
      {/* <Contact dict={dict}/> */}
      {/* <NavBar dict={dict}/> */}
      <h1>Hello World👋</h1>
      <LoginForm/>
    
    </>
  );
}

