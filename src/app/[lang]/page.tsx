// import LoginForm from "@/components/LoginForm";
// import { getDictionary } from "../[lang]/dictionaries";
// import Contact from "@/components/contact";
import Hero from "@/components/hero";
import DentistSection from "@/components/courseSection/dentist";
import Gynecologist from "@/components/courseSection/gyno";
import Ayurved from "@/components/courseSection/ayurveda";
import Dermatologist from "@/components/courseSection/dermatologist";
import ENTSpecialist from "@/components/courseSection/entSpecialist";
import GeneralPhysician from "@/components/courseSection/generalPhysician";
import Homeopath from "@/components/courseSection/homeopath";


// export type PageProps = {
//   params: {
//     lang: "en" | "ar";
//   };
// };


export default async function Page() {
  // { params,}: any
  //  const {lang} = await params;                                                                                                                                                                 
  //  const dict = await getDictionary(lang); 
  return (
    <>
      <Hero/>
      <section id="dentist" className="max-w-8xl mx-auto">
        <DentistSection/>
      </section>
      <section id="gynecologist" className="max-w-8xl mx-auto">
        <Gynecologist/>
      </section>
      <section id="ayurveda" className="max-w-8xl mx-auto">
        <Ayurved/>
      </section>
      <section id="dermatologist" className="max-w-8xl mx-auto">
        <Dermatologist/>
      </section>
      <section id="ent-Specialist" className="max-w-8xl mx-auto">
        <ENTSpecialist/>
      </section>
      <section id="general-physician" className="max-w-8xl mx-auto">
        <GeneralPhysician/>
      </section>
      <section id="homoeopath" className="max-w-8xl mx-auto">
        <Homeopath/>
      </section>
    </>
  );
}

