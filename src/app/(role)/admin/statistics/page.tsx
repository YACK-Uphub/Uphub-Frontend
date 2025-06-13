import React from "react";
import type {Metadata} from "next";
import UAdminDashboard from "@/features/dashboard/components/UAdminDashboard";

export const metadata: Metadata = {
  title: "Statistics",
  description: "View platform statistics and analytics on UpHub",
};

const StatisticsPage = () => {
  return (
      <div className="mx-auto w-full max-w-7xl px-4">
        <h1 className="mb-5 text-center text-3xl font-bold text-custom-blue-2">Thống kê Uphub</h1>
        <hr className="mx-auto mb-8 w-1/3 border-t-4 border-custom-yellow-3"/>
        <UAdminDashboard/>
      </div>
  );
};

export default StatisticsPage;
