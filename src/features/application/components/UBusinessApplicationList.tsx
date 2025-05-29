"use client"

import * as React from 'react';
import {useSearchApplicationsQuery} from "@/services/applicationsApi";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import UCardApplication from "@/components/shared/card/UCardApplication";
import {formatDate} from "@/utils/helpers";
import {UCardVariant} from "@/components/shared/card/UCardVariant";
import {UPagination} from "@/components/shadcn/pagination";

import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import {setPageIndex} from "@/features/application/slices/applicationSlice";

export const UBusinessApplicationList = () => {

    const applicationParams = useAppSelector(state => state.applicationParams);
    const {data, isLoading, isFetching} = useSearchApplicationsQuery({...applicationParams});
    const dispatch = useAppDispatch();

    if (isLoading || isFetching) {
        return <UPageSpinner></UPageSpinner>
    }

    const handlePageChange = (newPage: number) => {
        dispatch(setPageIndex(newPage));
    };

    return (
            <>
                {/* List */}
                <h1>Tổng đơn ứng tuyển ({data.totalCount})</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">

                    {data?.results?.length > 0 &&
                            data.results.map((item, index) => (
                                    <UCardApplication
                                            key={index}
                                            avatarUrl={item.imageUrl}
                                            name={item.fullname}
                                            role={item.jobTitle}
                                            experience={"7"}
                                            education={"Đại học"}
                                            submittedDate={formatDate(item.createdAt)}
                                            variant={UCardVariant.Normal}
                                    />
                            ))}
                </div>

                {/* Pagination */}
                <UPagination
                        currentPage={Number(applicationParams.pageNumber)}
                        totalPages={data.pageCount}
                        onPageChanged={handlePageChange}
                        className="mt-5"
                />
            </>
    );
};