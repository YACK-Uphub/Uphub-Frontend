import React from "react";
import type { Metadata } from "next";
import UAdminDashboard from "@/features/dashboard/components/UAdminDashboard";

export const metadata: Metadata = {
  title: "Statistics",
  description: "View platform statistics and analytics on UpHub",
};

const StatisticsPage = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4">
      <h1 className="text-custom-blue-2 text-3xl font-bold mb-5 text-center">Thống kê Uphub</h1>
      <hr className="w-1/3 border-t-4 border-custom-yellow-3 mx-auto mb-8" />
      <UAdminDashboard />
    </div>
  );
};

export default StatisticsPage;
