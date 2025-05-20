import React from "react";
import Image from "next/image";
import {BookmarkIcon} from "@heroicons/react/24/outline";

interface UCardJobForUProps {
	companyLogo: string;
	companyName: string;
	jobTitle: string;
	location: string;
	type: string;
	tag: string;
	postedTime: string;
}

const UCardJobForU = ({
	companyLogo,
	companyName,
	jobTitle,
	location,
	type,
	tag = "Ứng Tuyển Dễ Dàng",
	postedTime
}: UCardJobForUProps) => {
	return (
		<div
			className="relative flex flex-col gap-3 rounded-xl bg-custom-white p-4 shadow-sm w-full max-w-xs border border-custom-gray/20">

			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-2">
					<div className={"relative w-6 h-6"}>
						<Image
							src={companyLogo}
							alt={companyName}
							fill={true}
							objectFit={"cover"}
							className="rounded-full"
						/>
					</div>
					<span className="text-xs text-custom-gray/80 font-medium">{companyName}</span>
				</div>
				<BookmarkIcon className="h-4 w-4 text-gray-400"/>
			</div>

			{/* Job Info */}
			<div>
				<h3 className="text-sm font-semibold text-custom-gray">{jobTitle}</h3>
				<p className="text-xs text-custom-gray/70">
					{location} <span className="text-custom-blue-2">({type})</span>
				</p>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between">
				<div
					className="text-xs px-3 py-1 rounded-full border border-custom-blue-3 text-custom-blue-2 transition">
					{tag}
				</div>
				<span className="text-shadow-md text-custom-black/60">{postedTime}</span>
			</div>
		</div>
	);
};

export default UCardJobForU;
