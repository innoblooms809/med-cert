import LoginForm from "@/components/LoginForm";
import { getDictionary } from "../[lang]/dictionaries";

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
      <h1>Hello World👋</h1>
      <LoginForm/>
    </>
  );
}

