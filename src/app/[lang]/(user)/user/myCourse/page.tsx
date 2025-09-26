import React from 'react'
// import { getDictionary } from '@/app/[lang]/dictionaries';
import MyCourses from '@/components/user/mycourses';

export default async function MyCoursesPage() {
  // { params }: { params: Promise<{ lang: "en" | "ar" }>}
  // const {lang} = await params;
  // const dict = await getDictionary(lang);
  return (
   <>
   <MyCourses />
   </>
  )
}

