import React from "react";
import type { Metadata } from "next";
import { UStudentAccountTable } from "@/features/dashboard/components/UStudentAccountTable";

export const metadata: Metadata = {
  title: "Student Accounts",
  description: "Manage student accounts on UpHub",
};

const StudentAccountsPage = () => {
  return (
    <div className="mx-auto w-[70vw]">
      <UStudentAccountTable />
    </div>
  );
};

export default StudentAccountsPage;
