"use client"

import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {useSearchInternshipsQuery} from "@/services/internshipsApi";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import Image from "next/image";
import {UPagination} from "@/components/shared/UPagination";
import React from "react";
import {setPageIndex} from "@/features/internship/slices/internshipSlice";

export const UInternshipList = () => {
  const dispatch = useAppDispatch();

  const internshipParams = useAppSelector((state) => state.internshipParams);

  const {
    data: internships,
    isLoading,
  } = useSearchInternshipsQuery(internshipParams);

  if (isLoading) {
    return <UPageSpinner/>;
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPageIndex(newPage));
  };

  return (
      <div className="mx-auto mt-8 max-w-4xl space-y-8">
        {/* Header: Total count */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Tổng số Internship Records: {internships.totalCount}
        </h1>

        {/* Map over each internship entry and render a “card” */}
        <div className="grid grid-cols-1 gap-12">
          {internships.results.map((intern) => (
              <div
                  key={intern.id}
                  className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row"
              >
                {/* Left: Company image & student avatar */}
                <div className="flex flex-shrink-0 items-center justify-center p-4 bg-custom-white">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:w-20 bg-custom-white">
                    <Image
                        src={intern.companyImageUrl}
                        alt={`${intern.companyName} Logo`}
                        fill={true}
                        quality={50}
                        priority={false}
                        loading={"lazy"}
                        placeholder={"blur"}
                        blurDataURL={"/images/placeholderImage.png"}
                    />
                  </div>
                </div>

                {/* Right: Internship details */}
                <div className="flex-1 p-4 space-y-2">
                  {/* Student row */}
                  <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gray-300">
                      <Image
                          src={intern.studentImageUrl}
                          alt={intern.studentFullName}
                          fill
                          objectFit="cover"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {intern.studentFullName}{" "}
                        <span className="text-sm text-gray-500">({intern.studentCode})</span>
                      </p>
                      <p className="text-sm text-gray-500">{intern.studentEmail}</p>
                    </div>
                  </div>

                  {/* Job & Company Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Công việc:</span>
                      <span>{intern.jobTitle}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Công ty:</span>
                      <span>{intern.companyName}</span>
                    </div>
                  </div>

                  {/* Internship Status & Score */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="rounded-md bg-yellow-100 px-2 py-1 text-yellow-800">
                  Trạng thái: {intern.internshipStatus}
                </span>
                    {intern.score !== null && (
                        <span className="rounded-md bg-blue-100 px-2 py-1 text-blue-800">
                    Điểm: {intern.score.toFixed(1)}
                  </span>
                    )}
                  </div>

                  {/* Comment */}
                  {intern.comment && (
                      <div className="mt-2 text-sm italic text-gray-600">
                        “{intern.comment}”
                      </div>
                  )}
                </div>
              </div>
          ))}
        </div>

        {/* Pagination at bottom */}
        <UPagination
            currentPage={internshipParams.pageNumber}
            totalPages={internships.pageCount}
            onPageChanged={handlePageChange}
            className="mt-5"
        />
      </div>
  );
};
