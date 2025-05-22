import {ReactNode} from "react";

interface UJobStatCardProps {
	isCompany: boolean;
	icon: ReactNode;
	stat: string | number;
	jobLabel: string;
}

export default function UJobStatCard({icon, stat, jobLabel, isCompany = false}: UJobStatCardProps) {
	return (
		<div className="flex items-center gap-4 p-4 bg-custom-white
		 								rounded-xl shadow-sm flex-1 border">

			{/* Icon Box */}
			<div className={`${isCompany ? "bg-custom-gray/10" : "bg-custom-blue-2"} p-3 rounded-md`}>
				{icon}
			</div>

			{/* Text Content */}
			<div className={"text-nowrap"}>
				<div className="text-xl font-semibold text-custom-gray">{stat}</div>
				<div className="text-sm text-custom-gray">{jobLabel}</div>
			</div>
		</div>
	);
}