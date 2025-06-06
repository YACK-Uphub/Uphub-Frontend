import { Company } from "@/types/company";
import { Link, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

type UCompanyCardProps = {
  company: Company;
};
export default function UCardCompany({ company }: UCompanyCardProps) {
  return (
    <div className="max-w-sm rounded-xl border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-md border-gray-200">
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
            <span className="rounded-md bg-red-100 px-2 text-xs text-red-500 py-0.5">Liên kết</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Link className="mr-1 h-4 w-4" />
            <span>{company.websiteUrl}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-custom-blue-2">{company.companyName}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{company.address}</span>
        </div>
      </div>
    </div>
  );
}
