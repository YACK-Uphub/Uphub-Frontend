"use client";
import UCompanyList from "@/features/company/components/UCompanyList";
import {setInternshipProgramId, setPageSize} from "@/features/company/slices/companySlice";
import UInternshipProgramDetails from "@/features/internship-program/components/UInternshipProgramDetails";
import {useAppDispatch} from "@/libs/rtk/hooks";
import {useParams} from "next/navigation";
import React, {useEffect} from "react";

export default function InternshipProgramDetailsPage() {
  const {programId} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageSize(6));
    dispatch(setInternshipProgramId(programId));
  }, [dispatch]);

  return (
      <div>
        <UInternshipProgramDetails id={Number(programId)}/>
        <div className="py-10">
          <h1 className="pb-10 text-2xl font-semibold">Các công ty đối tác</h1>
          <UCompanyList viewType="card"/>
        </div>
      </div>
  );
}
