import Hero from "@/components/hero";
import { getDictionary } from "../[lang]/dictionaries";
import Contact from "@/components/contact";


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
      <Hero dict={dict} />
      <Contact dict={dict}/>
    
    </>
  );
}

