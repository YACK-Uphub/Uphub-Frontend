import React from "react";
import type { Metadata } from "next";
import UCompanyList from "@/features/company/components/UCompanyList";

export const metadata: Metadata = {
    title: "Companies",
    description: "Browse companies on UpHub",
};

const CompanyPage = () => {
    return (
        <div>
            <UCompanyList />
        </div>
    );
};

export default CompanyPage;
