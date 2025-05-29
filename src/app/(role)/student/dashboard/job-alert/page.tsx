import React from "react";
import type {Metadata} from "next";
import UJobList from "@/features/job/components/UJobList";

export const metadata: Metadata = {
    title: "Job Alerts",
    description: "Manage your models alert preferences on UpHub",
};

const JobAlertsPage = () => {
    return (
            <div>
                <h1 className="px-5 text-xl">Thông báo việc làm</h1>
                <UJobList viewType="row"/>
            </div>
    );
};

export default JobAlertsPage;
