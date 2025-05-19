// components/JobCard.tsx
import React from 'react';

interface JobCardProps {
	companyLogo: string;
	companyName: string;
	isFeatured?: boolean;
	location: string;
	jobTitle: string;
	jobType: string;
	salaryRange: string;
}

export const UCardJob = ({
	companyLogo,
	companyName,
	isFeatured = false,
	location,
	jobTitle,
	jobType,
	salaryRange,
}: JobCardProps) => {
	return (
		<div
			className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
			{/* Header with logo and featured badge */}
			<div className="relative p-4">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
						{companyLogo ? (
							<img src={companyLogo} alt={companyName} className="w-10 h-10 object-contain"/>
						) : (
							<span className="text-xl font-bold text-gray-400">{companyName.charAt(0)}</span>
						)}
					</div>

					<div className="flex-1">
						<h3 className="font-medium text-gray-900">{companyName}</h3>
						<p className="text-sm text-gray-500">{location}</p>
					</div>

					{isFeatured && (
						<span
							className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
              Featured
            </span>
					)}
				</div>
			</div>

			{/* Job details */}
			<div className="px-4 pb-4">
				<h2 className="text-lg font-semibold text-gray-800 mb-1">{jobTitle}</h2>

				<div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {jobType}
          </span>
					<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {salaryRange}
          </span>
				</div>

				<button
					className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
					Apply Now
				</button>
			</div>
		</div>
	);
};
