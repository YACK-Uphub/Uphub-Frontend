import React from "react";
import type {Metadata} from "next";
import UStudentApplicationList from "@/features/application/components/UStudentApplicationList";

export const metadata: Metadata = {
    title: "My Applications",
    description: "Track your internship applications on UpHub",
};

const MyApplicationsPage = () => {
    return (
            <div>
                <h1 className="text-xl px-5 text-custom-blue-2">Công việc đã ứng tuyển</h1>
                <UStudentApplicationList/>
            </div>
    );
};

export default MyApplicationsPage;
