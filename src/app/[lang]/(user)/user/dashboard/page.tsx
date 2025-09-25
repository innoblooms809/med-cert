import { getDictionary } from "@/app/[lang]/dictionaries";
import UserDashboardOverview from "@/components/user/dashboard";

export default async function DashboardPage({ params }: { params: Promise<{ lang: "en" | "ar" }>}) {
  
  const {lang} = await params;
  const dict = await getDictionary(lang);

  return (
    <>
    <UserDashboardOverview dict={dict}/>
  </>
   )
}

