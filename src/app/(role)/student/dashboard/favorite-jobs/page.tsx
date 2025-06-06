import React from "react";
import UJobList from "@/features/job/components/UJobList";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Favorite Jobs",
  description: "View your saved internship opportunities on UpHub",
};

const FavoriteJobsPage = () => {
  return (
      <div>
        <h1 className="px-5 text-xl text-custom-blue-2">Công việc yêu thích</h1>
        <UJobList viewType="row"/>
      </div>
  );
};

export default FavoriteJobsPage;
