import { getDictionary } from "@/app/[lang]/dictionaries";
import DashboardClient from "@/components/admin/DashboardClient";

export default async function DashboardPage( { params }: { params: Promise<{ lang: "en" | "ar" }>}) {
  
 
  const {lang} = await params;
  const dict = await getDictionary(lang);

  return (
    <>
    <DashboardClient />
  </>
   )
}

