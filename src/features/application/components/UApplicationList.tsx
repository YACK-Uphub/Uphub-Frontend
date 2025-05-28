"use client";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { useSearchApplicationsQuery } from "@/services/applicationsApi";
import React from "react";
import { setPageIndex } from "../slices/ApplicationSlice";
import { UPagination } from "@/components/shadcn/pagination";
import Link from "next/link";
import { Application } from "@/types/application";
import UJobRow from "@/components/shared/table/UJobRow";

export default function UApplicationList() {
    const applicationParams = useAppSelector((state) => state.applicationParams);
    const { data, isLoading } = useSearchApplicationsQuery(applicationParams);
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
                    <>
                        <h1 className="text-xl px-5">Các đơn ứng tuyển ({data.totalCount})</h1>

                        <div className="w-[70vw] flex flex-col">
                            {data.results.map((application: Application) => (
                                <Link href={`/student/applications/${application.id}`} key={application.id}>
                                    <UJobRow
                                        jobTitle={application.jobTitle}
                                        jobStatus={application.jobStatus}
                                        imageUrl={application.imageUrl}
                                        isApplied={true}
                                        city="hcm"
                                        jobType="Remote"
                                        salaryRange="10-20 triệu"
                                        applicatedDate={new Date(application.createdAt)}
                                        applicationStatus={application.status}
                                    />
                                </Link>
                            ))}
                        </div>
                    </>
                    {/* Pagination */}
                    <UPagination
                        currentPage={Number(applicationParams.pageNumber)}
                        totalPages={data.pageCount}
                        onPageChanged={handlePageChange}
                        className="mt-5"
                    />
                </>
            )}
        </>
    );
}
