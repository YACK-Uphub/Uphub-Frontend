"use client";
import UJobDetails from "@/features/job/components/UJobDetails";
import {useParams} from "next/navigation";
import React from "react";

export default function JobDetailsPage() {
  const {jobId} = useParams();

  return (
      <UJobDetails id={Number(jobId)}/>
  );


}
