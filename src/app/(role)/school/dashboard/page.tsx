﻿import React from "react";
import type {Metadata} from "next";
import USchoolDashboard from "@/features/dashboard/components/USchoolDashboard";

export const metadata: Metadata = {
  title: "School Dashboard",
  description: "View analytics and statistics for your school on UpHub",
};

const SchoolDashboardPage = () => {
  return (
      <div>
        <h1 className="mb-5 text-center text-3xl font-bold text-custom-blue-2">Thống kê OJT Summer 2025</h1>
        <USchoolDashboard/>
      </div>
  );
};

export default SchoolDashboardPage;
