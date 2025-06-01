"use client";
import UJobDetails from "@/features/job/components/UJobDetails";
import { UModalApplyingJob } from "@/features/job/components/UModalApplyingJob";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function JobDetailsPage() {
  const { jobId } = useParams();

  return <UJobDetails id={Number(jobId)} />;
}
