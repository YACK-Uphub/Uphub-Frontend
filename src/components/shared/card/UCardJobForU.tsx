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
			className="relative flex h-full w-full flex-col gap-3 rounded-xl border p-4 shadow-sm bg-custom-white border-custom-gray/20">

			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className={"relative w-12 h-12"}>
						<Image
							src={companyLogo}
							alt={companyName}
							fill={true}
							objectFit={"cover"}
							className="rounded-full"
						/>
					</div>
					<span className="text-md font-medium text-custom-gray/80">{companyName}</span>
				</div>
				<BookmarkIcon className="h-5 w-5 text-custom-gray"/>
			</div>

			{/* Job Info */}
			<div>
				<h3 className="text-md font-semibold text-custom-gray">{jobTitle}</h3>
				<p className="text-xs text-custom-gray/70">
					{location} <span className="text-custom-blue-2">({type})</span>
				</p>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between">
				<div
					className="rounded-full border px-3 py-1 text-xs transition border-custom-blue-3 text-custom-blue-2">
					{tag}
				</div>
				<span className="text-shadow-xs text-custom-black/60">{postedTime}</span>
			</div>
		</div>
	);
};

export default UCardJobForU;
