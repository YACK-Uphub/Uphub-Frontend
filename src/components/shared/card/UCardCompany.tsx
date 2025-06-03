import { Company } from "@/types/company";
import { Link, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

type UCompanyCardProps = {
  company: Company;
};
export default function UCardCompany({ company }: UCompanyCardProps) {
  return (
    <div className="max-w-sm rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="relative rounded-md w-10 h-10 overflow-hidden border-gray-200">
          <Image
            src={company.imageUrl}
            alt="Company Logo"
            fill
            className="object-cover"
            quality={50}
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholderImage.png"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">{company.businessType}</span>
            <span className="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-md">Liên kết</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Link className="w-4 h-4 mr-1" />
            <span>{company.websiteUrl}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-custom-blue-2">{company.companyName}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{company.address}</span>
        </div>
      </div>
    </div>
  );
}
