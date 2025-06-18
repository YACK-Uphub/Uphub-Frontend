"use client";
import React from "react";
import UCardTopCompany from "@/components/shared/card/UCardTopCompany";
import {SearchPaginatedRequestParams} from "@/types/baseModel";
import {useSearchCompaniesQuery} from "@/services/companiesApi";
import {Company} from '@/types/company';

const UTopCompaniesSection = () => {
  const params: SearchPaginatedRequestParams = {pageNumber: 1, pageSize: 8};
  const {data} = useSearchCompaniesQuery(params);
  return (
      <>
        <h2
            className="font-bold mb-8 p-2
										 sm:text-2xl sm:p-4 sm:mb-16
									 text-custom-black text-center
									   border rounded-2xl
									 bg-custom-yellow-3"
        >
          Công ty Hàng Đầu
        </h2>
        <div
            className="grid grid-cols-1 gap-10
											sm:grid-cols-2 sm:gap-12
			 								xl:grid-cols-4 xl:gap-12"
        >
          {data && data.results.map((company: Company, index) => (
              <UCardTopCompany key={index} {...company} />
          ))}
        </div>
      </>
  );
};

export default UTopCompaniesSection;
