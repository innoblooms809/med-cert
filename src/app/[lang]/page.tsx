import { getDictionary } from "../[lang]/dictionaries";
import Hero from "@/components/hero";
import DentistSection from "@/components/courseSection/dentist";
import Gynecologist from "@/components/courseSection/gyno";
import Ayurved from "@/components/courseSection/ayurveda";
// import Dermatologist from "@/components/courseSection/dermatologist";
// import ENTSpecialist from "@/components/courseSection/entSpecialist";
// import GeneralPhysician from "@/components/courseSection/generalPhysician";
// import Homeopath from "@/components/courseSection/homeopath";
import CoursesSection from "@/components/courseSection/CourseSection";
import ReviewCarousel from "@/components/reviewSection";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict} lang={lang} />
      <CoursesSection dict={dict} />
      <section id="dentist" className="max-w-8xl mx-auto">
        <DentistSection dict={dict} />
      </section>
      <section id="gynecologist" className="max-w-8xl mx-auto">
        <Gynecologist dict={dict} />
      </section>
      <section id="ayurveda" className="max-w-8xl mx-auto">
        <Ayurved dict={dict} />
      </section>
      <ReviewCarousel dict={dict} />

      {/* <section id="dermatologist" className="max-w-8xl mx-auto">
        <Dermatologist dict={dict} />
      </section>
      <section id="ent-Specialist" className="max-w-8xl mx-auto">
        <ENTSpecialist dict={dict} />
      </section>
      <section id="general-physician" className="max-w-8xl mx-auto">
        <GeneralPhysician dict={dict} />
      </section>
      <section id="homoeopath" className="max-w-8xl mx-auto">
        <Homeopath dict={dict} />
      </section> */}
    </>
  );
}
