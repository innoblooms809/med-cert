"";
import React from "react";
import Cards from "./userdashboarComponent/Cards";
interface Props {
  dict: any;
  lang:any;
}

const UserDashboardClient = ({dict,lang}:Props) => {
  return (
    <div
      className="space-y-2 p-2"
      style={{
        background: "var(--content-bg)",
        color: "var(--section-text)",
      }}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* <DashboardCards dict={dict} lang={lang} /> */}
        <Cards dict={dict} lang={lang} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {/* <CourseData dict={dict} lang={lang}/> */}
      </div>
      <div className="grid grid-cols-1 gap-4">
        
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      
      </div>
      <div className="grid grid-cols-1 gap-4">
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
      </div>
    </div>
  );
}

export default UserDashboardClient;