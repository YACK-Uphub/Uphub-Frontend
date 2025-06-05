import React from "react";
import type { Metadata } from "next";
import { UStudentAccountTable } from "@/features/dashboard/components/UStudentAccountTable";

export const metadata: Metadata = {
  title: "Student Accounts",
  description: "Manage student accounts on UpHub",
};

const StudentAccountsPage = () => {
  return (
    <div className="w-[70vw] mx-auto">
      <UStudentAccountTable />
    </div>
  );
};

export default StudentAccountsPage;
