"use client";
import { useGetCompanyByIdQuery } from "@/services/companiesApi";
import Image from "next/image";
import React from "react";

export default function UCompanyInfoCard({ id }: { id: number }) {
    const { data: company, isLoading } = useGetCompanyByIdQuery(id);
    if (isLoading) return;
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
                <div className=" relative w-12 h-12 rounded-lg flex items-center justify-center">
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

            <div className="space-y-3 text-sm">
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
                    <span className="font-medium text-custom-blue-2">{company.websiteUrl}</span>
                </div>
            </div>
        </div>
    );
}
