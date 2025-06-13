import React from "react";
import type {Metadata} from "next";
import {UcompanyAccountTable} from "@/features/dashboard/components/UCompanyAccountTable";

export const metadata: Metadata = {
  title: "Company Accounts",
  description: "Manage company accounts on UpHub",
};

const CompanyAccountsPage = () => {
  return (
      <div>
        <UcompanyAccountTable/>
      </div>
  );
};

export default CompanyAccountsPage;
