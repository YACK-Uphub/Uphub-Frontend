import React from "react";
import type {Metadata} from "next";
import UJobList from "@/features/job/components/UJobList";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Browse internship opportunities on UpHub",
};

const JobListingPage = () => {
  return (
      <div>
        <UJobList/>
      </div>
  );
};

export default JobListingPage;
