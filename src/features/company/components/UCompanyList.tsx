"use client";
import UCompanyRow from "@/components/shared/table/UCompanyRow";
import { useAppSelector } from "@/libs/rtk/hooks";
import { useGetSearchCompaniesQuery } from "@/services/companiesApi";
import { Company } from "@/types/company";
import Link from "next/link";
import React from "react";

export default function UCompanyList() {
    const companyParams = useAppSelector((state) => state.company);
    const { data, isLoading } = useGetSearchCompaniesQuery(companyParams);

    if (isLoading) return;

    return (
        <>
            {!data ? (
                <div>empty list</div>
            ) : (
                <>
                    <div className="w-[70vw] flex flex-col gap-y-4">
                        {data.results.map((company: Company) => (
                            <Link href={`companies/${company.id}`}>
                                <UCompanyRow
                                    businessType={company.businessType}
                                    companyName={company.companyName}
                                    city={company.city}
                                    imageUrl={company.imageUrl}
                                    onClick={() => {}}
                                />
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
