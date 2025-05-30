"use client"

import React from 'react';
import {getStyleCardVariant, UCardVariant} from "@/components/shared/card/UCardVariant";
import Image from "next/image";

export interface UJobCardProps {
	companyLogoUrl: string;
	companyName: string;
	isFeatured?: boolean;
	location: string;
	jobTitle: string;
	jobType: string;
	salaryRange: string;
	variant: UCardVariant;
}

export const UCardJob = ({
	companyLogoUrl,
	companyName,
	isFeatured = false,
	location,
	jobTitle,
	jobType,
	salaryRange,
	variant = UCardVariant.Normal,
}: UJobCardProps) => {

	return (
		<div className={`max-w-xs rounded-lg overflow-hidden shadow-md ${getStyleCardVariant(variant)} border`}>

			{/* Header with logo and featured badge */}
			<div className="relative p-4">
				<div className="flex items-center gap-3">
					<div className="relative h-12 w-12 overflow-hidden rounded-full">
						<Image
							src={companyLogoUrl}
							alt={`${companyName} Logo`}
							fill={true}
							objectFit={"cover"}
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
							className="absolute top-4 right-4 rounded px-2 text-xs font-medium bg-custom-green-bg text-custom-green-text py-0.5">
              Featured
            </span>
					)}
				</div>
			</div>

			{/* Job details */}
			<div className="px-4 pb-4">
				<h2 className="mb-1 text-lg font-semibold text-custom-black">{jobTitle}</h2>

				<div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded text-xs font-medium bg-custom-blue-1 text-custom-blue-3 px-2.5 py-0.5">
            {jobType}
          </span>
					<span className="rounded text-xs font-medium bg-custom-purple-bg text-custom-purple-text px-2.5 py-0.5">
            {salaryRange}
          </span>
				</div>
			</div>
		</div>
	);
};
