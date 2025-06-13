"use client";
import UCompanyDetails from "@/features/company/components/UCompanyDetails";
import {useParams} from "next/navigation";
import React from "react";

export default function StudentPage() {
  const {companyId} = useParams();

  return (
      <>
        <UCompanyDetails id={Number(companyId)}/>
      </>
  );
}
