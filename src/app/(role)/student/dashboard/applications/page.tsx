import React from "react";
import type { Metadata } from "next";
import UApplicationList from "@/features/application/components/UStudentApplicationList";

export const metadata: Metadata = {
    title: "My Applications",
    description: "Track your internship applications on UpHub",
};

const MyApplicationsPage = () => {
    return (
        <div>
            <UApplicationList />
        </div>
    );
};

export default MyApplicationsPage;
