// import LoginForm from "@/components/LoginForm";
import LoginForm from "@/components/login";
import { getDictionary } from "../../dictionaries";

export default async function Loginpage({
 params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LoginForm dict={dict} />;
}
