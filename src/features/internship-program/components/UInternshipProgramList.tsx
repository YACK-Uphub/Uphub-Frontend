"use client";
import UInternshipProgramRow from "@/components/shared/table/UInternshipRow";
import {UPagination} from "@/components/shared/UPagination";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {useSearchInternshipProgramsQuery} from "@/services/internshipProgramsApi";
import Link from "next/link";
import React from "react";
import {setPageIndex} from "../slices/internshipProgramSlice";
import {InternshipProgram} from "@/types/internshipProgram";

export default function UInternshipProgramList() {
  const internshipParams = useAppSelector((state) => state.internshipProgramParams);
  const {data, isLoading} = useSearchInternshipProgramsQuery(internshipParams);
  const dispatch = useAppDispatch();

  const handlePageChange = (newPage: number) => {
    dispatch(setPageIndex(newPage));
  };

  if (isLoading) return;
  return (
      <div>
        {!data ? (
            <div>empty list</div>
        ) : (
            <div>
              <div className="flex flex-col w-[70vw]">
                <div
                    className={`px-8 py-4 border-b-2 bg-gray-200 text-custom-blue-2 grid grid-cols-7 items-center gap-4 transition-all duration-200`}
                >
                  <div></div>
                  <div className="col-span-2">Internship Program</div>
                  <div className="col-start-4">Start Date</div>
                  <div className="col-start-5">End Date</div>
                  <div className="col-start-6">Semester</div>
                  <div className="col-start-7"></div>
                </div>
                {data.results.map((internshipProgram: InternshipProgram) => (
                    <Link href={`/school/internship-programs/${internshipProgram.id}`} key={internshipProgram.id}>
                      <UInternshipProgramRow intershipProgram={internshipProgram}/>
                    </Link>
                ))}
              </div>
              {/* Pagination */}
              <UPagination
                  currentPage={Number(internshipParams.pageNumber)}
                  totalPages={data.pageCount}
                  onPageChanged={handlePageChange}
                  className="mt-5"
              />
            </div>
        )}
      </div>
  );
}
