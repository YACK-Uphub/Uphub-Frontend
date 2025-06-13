"use client";
import UCompanyRow from "@/components/shared/table/UCompanyRow";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {useSearchCompaniesQuery} from "@/services/companiesApi";
import {Company} from "@/types/company";
import Link from "next/link";
import React from "react";
import {setPageIndex} from "../slices/companySlice";
import {UPagination} from "@/components/shared/UPagination";
import UCardCompany from "@/components/shared/card/UCardCompany";

type UCompanyListProps = {
  viewType?: "card" | "row";
  showPagination?: boolean;
};
export default function UCompanyList({viewType = "row", showPagination = true}: UCompanyListProps) {
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
              {/* <div className="flex gap-3 pb-5">
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
              icon={<Briefcase />}
              iconPosition="left"
            />
          </div> */}
              {viewType === "card" ? (
                  <div className="grid grid-cols-3 gap-6">
                    {data.results.map((company: Company) => (
                        <Link href={`/student/companies/${company.id}`} key={company.id}>
                          <UCardCompany company={company}/>
                        </Link>
                    ))}
                  </div>
              ) : (
                  <>
                    <div className="flex flex-col gap-y-4 w-[70vw]">
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
                  </>
              )}

              {/* Pagination */}
              {showPagination && (
                  <UPagination
                      currentPage={Number(companyParams.pageNumber)}
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
