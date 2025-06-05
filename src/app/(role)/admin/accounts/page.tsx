import React from "react";
import type { Metadata } from "next";
import { UStudentAccountTable } from "@/features/dashboard/components/UStudentAccountTable";

export const metadata: Metadata = {
  title: "Account Management",
  description: "Manage user accounts on UpHub",
};

const StudentAccountPage = () => {
  return (
    <div >
      <h1 className="text-custom-blue-2 text-2xl font-bold mb-5">Student Accounts</h1>
    </div>
  );
};

export default StudentAccountPage;
