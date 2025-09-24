import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function DashboardPage({ params }: { params: Promise<{ lang: "en" | "ar" }>}) {
  
  const {lang} = await params;
  const dict = await getDictionary(lang);

  return (
    <>
    <h1>This is dashboard body content</h1>
  </>
   )
}

