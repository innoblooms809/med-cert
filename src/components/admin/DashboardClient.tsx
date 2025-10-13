"";
import React from "react";
import DashboardCards from "./dashboardComponent/Cards";
import CourseData from "./dashboardComponent/CourseData";
import TestData from "./dashboardComponent/TestData";
import UserData from "./dashboardComponent/UserData";
import ReportData from "./dashboardComponent/ReportData";
import RecentActivity from "./dashboardComponent/ReacentActivity";
import Charts from "./dashboardComponent/Charts";
import ProgressTable from "./dashboardComponent/ProgessTable";

interface Props {
  dict: any;
  lang:any;
}

const DashboardClient = ({dict,lang}:Props) => {
  return (
    <div
      className="space-y-2 p-2"
      style={{
        background: "var(--content-bg)",
        color: "var(--section-text)",
      }}
    >
      <div className="grid grid-cols-1 gap-4">
        <DashboardCards dict={dict} lang={lang} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <CourseData dict={dict} lang={lang}/>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <TestData />
      </div>
      <UserData />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {/* Other cards here... */}
        <ReportData />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        <ProgressTable />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Charts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <CMFTracerCard dict={dict} /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <RecentActivity />
      </div>
    </div>
  );
}

export default DashboardClient;