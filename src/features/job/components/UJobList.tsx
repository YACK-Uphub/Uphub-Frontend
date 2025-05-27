"use client";
import { UCardJob } from "@/components/shared/card/UCardJob";
import { UCardVariant } from "@/components/shared/card/UCardVariant";
import { UPageSpinner } from "@/components/shared/spinner/UPageSpinner";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { useSearchJobsQuery } from "@/services/jobsApi";
import { Job } from "@/types/job";
import Link from "next/link";
import React from "react";

export default function UJobList() {
    const jobParams = useAppSelector((state) => state.jobParams);
    const { data, isLoading } = useSearchJobsQuery(jobParams);
    //const dispatch = useAppDispatch();

    if (isLoading) return;
    console.log(data);

    return (
        <>
            {!data ? (
                <div>empty list</div>
            ) : (
                <>
                    <div className="grid grid-cols-3 gap-6">
                        {data.results.map((job: Job) => (
                            <Link href={`/student/jobs/${job.id}`} key={job.id}>
                                <UCardJob
                                    companyLogoUrl={job.companyImageUrl}
                                    companyName={job.companyName}
                                    jobTitle={job.title}
                                    jobType={job.jobType}
                                    location={job.city}
                                    salaryRange={job.salaryRange}
                                    isFeatured={job.isFeatured}
                                    variant={job.isHighlighted ? UCardVariant.Yellow : UCardVariant.Normal}
                                />
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
