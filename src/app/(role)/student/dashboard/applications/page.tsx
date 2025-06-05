import React from "react";
import UStudentApplicationList from "@/features/application/components/UStudentApplicationList";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "My Applications",
  description: "Track your internship applications on UpHub",
};

const MyApplicationsPage = () => {
    return (
            <div>
                <h1 className="px-5 text-xl text-custom-blue-2">Công việc đã ứng tuyển</h1>
                <UStudentApplicationList/>
            </div>
    );
};

export default MyApplicationsPage;
