"use client"

import React from 'react';
import {CardVariant, getVariantClass} from "@/components/shared/card/UCardVariant";
import Image from "next/image";

export interface JobCardProps {
	companyLogoUrl: string;
	companyName: string;
	isFeatured?: boolean;
	location: string;
	jobTitle: string;
	jobType: string;
	salaryRange: string;
	variant: CardVariant;
}

export const UCardJob = ({
	companyLogoUrl,
	companyName,
	isFeatured = false,
	location,
	jobTitle,
	jobType,
	salaryRange,
	variant = CardVariant.Normal,
}: JobCardProps) => {

	const handleApplyNow = () => {
		alert("Apply Now");
	}

	return (
		<div className={`max-w-xs rounded-lg overflow-hidden shadow-md ${getVariantClass(variant)} border`}>

			{/* Header with logo and featured badge */}
			<div className="relative p-4">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 bg-custom-gray relative rounded-full overflow-hidden">
						<Image
							src={companyLogoUrl}
							alt={`${companyName} Logo`}
							fill={true}
							objectFit={"cover"}
							className="rounded-full"
							quality={50}
							priority={false}
							loading={"lazy"}
							placeholder={"blur"}
							blurDataURL={"/images/placeholderImage.png"}
						/>
					</div>

					<div className="flex-1">
						<h3 className="font-medium text-custom-black">{companyName}</h3>
						<p className="text-sm text-custom-gray">{location}</p>
					</div>

					{isFeatured && (
						<span
							className="absolute top-4 right-4 bg-custom-green-bg text-custom-green-text text-xs font-medium px-2 py-0.5 rounded">
              Featured
            </span>
					)}
				</div>
			</div>

			{/* Job details */}
			<div className="px-4 pb-4">
				<h2 className="text-lg font-semibold text-custom-black mb-1">{jobTitle}</h2>

				<div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-custom-blue-1 text-custom-blue-3 text-xs font-medium px-2.5 py-0.5 rounded">
            {jobType}
          </span>
					<span className="bg-custom-purple-bg text-custom-purple-text text-xs font-medium px-2.5 py-0.5 rounded">
            {salaryRange}
          </span>
				</div>

				<button onClick={handleApplyNow}
								className="mt-4 w-full bg-custom-blue-2 hover:bg-custom-blue-3 text-custom-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
					Apply Now
				</button>
			</div>
		</div>
	);
};
