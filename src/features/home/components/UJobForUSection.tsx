"use client";
import UCardJobForU from "@/components/shared/card/UCardJobForU";
import {useSearchJobsQuery} from "@/services/jobsApi";
import {SearchPaginatedRequestParams} from "@/types/baseModel";
import {Job} from "@/types/job";
import React from "react";

const UJobForUSection = () => {
  const params: SearchPaginatedRequestParams = {pageNumber: 1, pageSize: 8};
  const {data} = useSearchJobsQuery(params);

  return (
      <>
        <h2
            className="mb-8 text-center
                  sm:text-2xl sm:p-4 sm:mb-16 font-bold
                  text-custom-blue-3"
        >
          Công việc Dành Cho Bạn
        </h2>
        <div
            className="grid grid-cols-1 gap-10
                  sm:grid-cols-2 sm:gap-12
                  xl:grid-cols-4 xl:gap-12"
        >
          {data && data.results.map((job: Job, index) => <UCardJobForU key={index} {...job} />)}
        </div>
      </>
  );
};

export default UJobForUSection;
