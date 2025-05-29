"use client";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {useSearchApplicationsQuery} from "@/services/applicationsApi";
import React, {useEffect} from "react";
import {setPageIndex, setUserId} from "../slices/applicationSlice";
import {UPagination} from "@/components/shadcn/pagination";
import Link from "next/link";
import {Application} from "@/types/application";
import UJobRow from "@/components/shared/table/UJobRow";

export default function UStudentApplicationList() {
    const applicationParams = useAppSelector((state) => state.applicationParams);
    const {data, isLoading} = useSearchApplicationsQuery(applicationParams);
    const dispatch = useAppDispatch();

    // TODO: Get current user
    useEffect(() => {
        dispatch(setUserId(1));
    }, [dispatch]);

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
                                <div className="w-[70vw] flex flex-col">
                                    {data.results.map((application: Application) => (
                                            <Link href={`applications/${application.id}`} key={application.id}>
                                                <UJobRow
                                                        jobTitle={application.jobTitle}
                                                        jobStatus={application.jobStatus}
                                                        imageUrl={application.companyImageUrl}
                                                        isApplied={true}
                                                        city={application.city}
                                                        jobType={application.jobType}
                                                        salaryRange={application.salaryRange}
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
