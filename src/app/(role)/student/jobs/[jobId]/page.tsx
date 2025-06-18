"use client";
import UJobDetails from "@/features/job/components/UJobDetails";
import UJobList from "@/features/job/components/UJobList";
import {useParams} from "next/navigation";
import React from "react";

export default function JobDetailsPage() {
  const {jobId} = useParams();

  return (
      <div>
        <UJobDetails id={Number(jobId)}/>
        <div className="py-10">
          <h1 className="text-2xl font-semibold">Các công việc liên quan:</h1>
          <UJobList showPagination={false}/>
        </div>
      </div>
  );
}
