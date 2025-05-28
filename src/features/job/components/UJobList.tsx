"use client";
import { UCardJob } from "@/components/shared/card/UCardJob";
import { UCardVariant } from "@/components/shared/card/UCardVariant";
import UJobRow from "@/components/shared/table/UJobRow";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { useSearchJobsQuery } from "@/services/jobsApi";
import { Job, JobDateType } from "@/types/job";
import Link from "next/link";
import React from "react";
import { setPageIndex, setSort } from "../slices/jobSlice";
import { UPagination } from "@/components/shadcn/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";

type UJobListProps = {
    viewType?: "card" | "row";
    userJobStatus?: "applied" | "favorite" | "alert" | undefined;
    showPagination?: boolean;
};
export default function UJobList({ viewType = "card", userJobStatus, showPagination = true }: UJobListProps) {
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
                    {/* Order By */}
                    <div className="pb-2 flex justify-end">
                        <Select onValueChange={(value) => dispatch(setSort(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={JobDateType.DateAsc}>Mới nhất</SelectItem>
                                    <SelectItem value={JobDateType.DateDesc}>Cũ nhất</SelectItem>
                                    <SelectItem value={JobDateType.ClosingSoon}>Gần đóng</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Data */}
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
                            <div className="w-[70vw] flex flex-col">
                                {data.results.map((job: Job) => (
                                    <Link href={`/student/jobs/${job.id}`} key={job.id}>
                                        <UJobRow
                                            jobTitle={job.title}
                                            jobStatus={job.jobStatus}
                                            imageUrl={job.companyImageUrl}
                                            city={job.city}
                                            jobType={job.jobType}
                                            salaryRange={job.salaryRange}
                                            closingDate={new Date(job.closingDate)}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                    {/* Pagination */}
                    {showPagination && (
                        <UPagination
                            currentPage={Number(jobParams.pageNumber)}
                            totalPages={data.pageCount}
                            onPageChanged={handlePageChange}
                            className="mt-5"
                        />
                    )}
                </>
            )}
        </>
    );
}
