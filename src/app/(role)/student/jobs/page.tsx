"use client";
import React from "react";
import UJobList from "@/features/job/components/UJobList";
import { useAppDispatch } from "@/libs/rtk/hooks";
import { resetParams } from "@/features/job/slices/jobSlice";

// export const metadata: Metadata = {
//   title: "Jobs",
//   description: "Browse internship opportunities on UpHub",
// };

const JobListingPage = () => {
  const dispatch = useAppDispatch();
  dispatch(resetParams());
  return (
    <div>
      <UJobList />
    </div>
  );
};

export default JobListingPage;
