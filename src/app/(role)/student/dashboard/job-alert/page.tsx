import React from "react";
import UJobList from "@/features/job/components/UJobList";
import {Metadata} from "next";

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
