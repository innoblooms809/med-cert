import LoginForm from "@/components/LoginForm";
import { getDictionary } from "../[lang]/dictionaries";
import Contact from "@/components/contact";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";


export type PageProps = {
  params: {
    lang: "en" | "ar";
  };
};


export default async function Page({ params,}: any) {
   const {lang} = await params;                                                                                                                                                                 
   const dict = await getDictionary(lang); 
  return (
    <>
      <LoginForm/>
    </>
  );
}

