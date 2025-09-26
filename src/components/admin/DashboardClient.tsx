"";
import React from "react";
import DashboardCards from "./dashboardComponent/Cards";
import CourseData from "./dashboardComponent/CourseData";
import TestData from "./dashboardComponent/TestData";
import UserData from "./dashboardComponent/UserData";
import ReportData from "./dashboardComponent/ReportData";

interface Props{
  dict:any;
}
// types.ts
export interface Quiz {
  testType: "Objective" | "Subjective";
  testFor: string;
  specialization: string;
  totalQuestions: number;
  marking: string;
}


const courses = [
    { title: "Heart Health Basics", author: "Dr. Ahmed", courseRole: "Doctor", specialization: "Cardiology" },
    { title: "ICU Care Essentials", author: "Nurse Aisha", courseRole: "Nurse", specialization: "Emergency Care" },
    // ... other courses
  ];

  const quizzes: Quiz[] = [
  { testType: "Objective", testFor: "Doctor", specialization: "Cardiology",totalQuestions: 10,marking: "1 Q = 1 mark", },
  {testType: "Subjective",testFor: "Nurse",specialization: "Emergency Care",totalQuestions: 5,marking: "1 Q = 2 marks",},
];


const DashboardClient=()=>{
  return (
    <div
      className="space-y-6 p-6"
      style={{
        background: "var(--content-bg)",
        color: "var(--section-text)",
      }}
    >
      <div className="grid grid-cols-1 gap-4">
        <DashboardCards/>
      </div>
      <CourseData courses={courses}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TestData quizzes={quizzes}/>
        <UserData />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {/* Other cards here... */}
      <ReportData />
    </div>

      <div className="grid grid-cols-1 gap-4">
        {/* <ComplianceAnalytics dict={dict}  /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <CMETimeline  dict={dict}/> */}
        {/* <CMFTracerCard dict={dict} /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {/* <FacilityManagement dict={dict} /> */}
      </div>     
    </div>
  );
}

export default DashboardClient;