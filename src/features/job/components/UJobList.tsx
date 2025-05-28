"use client";
import { UCardJob } from "@/components/shared/card/UCardJob";
import { UCardVariant } from "@/components/shared/card/UCardVariant";
import UJobRow from "@/components/shared/table/UJobRow";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { useSearchJobsQuery } from "@/services/jobsApi";
import { Job } from "@/types/job";
import Link from "next/link";
import React from "react";
import { setPageIndex } from "../slices/jobSlice";
import { UPagination } from "@/components/shadcn/pagination";

type UJobListProps = {
    viewType?: "card" | "row";
    userJobStatus?: "applied" | "favorite" | "alert" | undefined;
};
export default function UJobList({ viewType = "card", userJobStatus }: UJobListProps) {
    const jobParams = useAppSelector((state) => state.jobParams);
    const { data, isLoading } = useSearchJobsQuery(jobParams);
    const dispatch = useAppDispatch();

    const handlePageChange = (newPage: number) => {
        dispatch(setPageIndex(newPage));
    };

    if (isLoading) return;

    return (
        <>
            {!data ? (
                <div>empty list</div>
            ) : (
                <>
                    {viewType === "card" ? (
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
                    ) : (
                        <>
                            <h1 className="text-xl px-5">Công việc yêu thích ({data.totalCount})</h1>

                            <div className="w-[70vw] flex flex-col">
                                {data.results.map((job: Job) => (
                                    <Link href={`/student/jobs/${job.id}`} key={job.id}>
                                        <UJobRow job={job} />
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                    <UPagination
                        currentPage={Number(jobParams.pageNumber)}
                        totalPages={data.pageCount}
                        onPageChanged={handlePageChange}
                    />

                    {/* Pagination Info */}
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Page {Number(jobParams.pageNumber)} of {data.pageCount.toFixed()}
                        {data.totalCount > 0 && <span> • {data.totalCount} total items</span>}
                    </div>
                </>
            )}
        </>
    );
}
