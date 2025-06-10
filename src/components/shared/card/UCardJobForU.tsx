import React from "react";
import Image from "next/image";
import {BookmarkIcon} from "@heroicons/react/24/outline";
import {formatDate} from "@/utils/functionHelpers";

interface UCardJobForUProps {
  companyImageUrl?: string;
  companyName: string;
  title: string;
  city: string;
  jobType: string;
  createdAt?: string | Date;
}

const UCardJobForU = ({ city, companyImageUrl, companyName, createdAt, jobType, title }: UCardJobForUProps) => {
  return (
    <div
      className="flex h-full w-full flex-col gap-3
			 					 rounded-xl border p-4 shadow-sm bg-custom-white border-custom-gray/20"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={"relative w-12 h-12"}>
            <Image src={companyImageUrl} alt={companyName} fill={true} objectFit={"cover"} className="rounded-full" />
          </div>
          <span className="font-medium text-md text-custom-gray/80">{companyName}</span>
        </div>
        <BookmarkIcon className="h-5 w-5 text-custom-gray" />
      </div>

      {/* Job Info */}
      <div className={"flex-1"}>
        <h3 className="font-semibold text-md text-custom-gray">{title}</h3>
        <p className="text-xs text-custom-gray/70">
          {city} <span className="text-custom-blue-2">({jobType})</span>
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="rounded-full border px-3 py-1 text-xs transition border-custom-blue-3 text-custom-blue-2">
          "Ứng tuyển dễ dàng"
        </div>
        <span className="text-shadow-xs text-custom-black/60">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default UCardJobForU;
