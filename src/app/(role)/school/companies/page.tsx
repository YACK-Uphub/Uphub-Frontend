"use client";
import React from "react";
import UCompanyList from "@/features/company/components/UCompanyList";
import {useAppDispatch} from "@/libs/rtk/hooks";
import {setPageSize} from "@/features/company/slices/companySlice";

const PartnerCompaniesPage = () => {
  const dispatch = useAppDispatch();
  dispatch(setPageSize(9));
  return (
    <div>
      <h1 className="mb-5 text-center text-3xl font-bold text-custom-blue-2">Các doanh nghiệp đã liên kết</h1>
      <hr className="mx-auto mb-8 w-1/2 border-t-4 border-custom-yellow-3" />
      <UCompanyList viewType="card" />
    </div>
  );
};

export default PartnerCompaniesPage;
