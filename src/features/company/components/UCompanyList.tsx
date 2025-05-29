"use client";
import {UPagination} from "@/components/shadcn/pagination";
import UCompanyRow from "@/components/shared/table/UCompanyRow";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {useSearchCompaniesQuery} from "@/services/companiesApi";
import {Company} from "@/types/company";
import Link from "next/link";
import React from "react";
import {resetParams, setIsLinked, setPageIndex} from "../slices/companySlice";
import UButton from "@/components/shared/UButton";
import {Briefcase} from "lucide-react";

export default function UCompanyList() {
    const companyParams = useAppSelector((state) => state.companyParams);
    const {data, isLoading} = useSearchCompaniesQuery(companyParams);
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
                            {/* Filter */}
                            <div className="flex gap-3 pb-5">
                                <UButton
                                        label="All"
                                        onClick={() => {
                                            dispatch(resetParams());
                                        }}
                                        backgroundColor="bg-gray-200"
                                        textColor="text-custom-blue-2"
                                />
                                <UButton
                                        label="OJT"
                                        onClick={() => {
                                            dispatch(setIsLinked(true));
                                        }}
                                        backgroundColor="bg-custom-yellow-2"
                                        textColor="text-custom-blue-2"
                                        icon={<Briefcase/>}
                                        iconPosition="left"
                                />
                            </div>

                            <div className="w-[70vw] flex flex-col gap-y-4">
                                {data.results.map((company: Company) => (
                                        <Link href={`/student/companies/${company.id}`} key={company.id}>
                                            <UCompanyRow
                                                    businessType={company.businessType}
                                                    companyName={company.companyName}
                                                    city={company.city}
                                                    imageUrl={company.imageUrl}
                                            />
                                        </Link>
                                ))}
                            </div>
                            {/* Pagination */}
                            <UPagination
                                    currentPage={Number(companyParams.pageNumber)}
                                    totalPages={data.pageCount}
                                    onPageChanged={handlePageChange}
                                    className="mt-5"
                            />
                        </>
                )}
            </>
    );
}
