"use client";
import { useGetCompanyByIdQuery } from "@/services/companiesApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UCompanyInfoCard({ id }: { id: number }) {
  const { data: company, isLoading } = useGetCompanyByIdQuery(id);
  if (isLoading) return;
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center space-x-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-lg">
          <Image
            src={company.imageUrl}
            alt="company logo"
            quality={50}
            loading="lazy"
            fill
            objectFit={"cover"}
            priority={false}
          />
        </div>
        <div>
          <h3 className="font-semibold text-custom-black">{company.companyName}</h3>
          <p className="text-sm text-custom-gray">{company.businessType}</p>
        </div>
      </div>

      <div className="text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-custom-gray">Thành lập</span>
          <span className="font-medium">{company.establishedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-gray">Phân loại tổ chức</span>
          <span className="font-medium">{company.organizationType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-gray">Quy mô</span>
          <span className="font-medium">{company.companySize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-gray">SĐT</span>
          <span className="font-medium">{company.phoneNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-gray">Email</span>
          <span className="font-medium">{company.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-custom-gray">Website</span>
          <Link
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-custom-blue-2 hover:underline"
          >
            {company.websiteUrl}
          </Link>
        </div>
      </div>
    </div>
  );
}
