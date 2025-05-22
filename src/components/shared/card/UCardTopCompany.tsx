import StarIcon from "@heroicons/react/24/solid/StarIcon";
import Image from "next/image";
import {getStyleCardVariant, UCardVariant} from "@/components/shared/card/UCardVariant";

export interface CompanyCardProps {
	logoUrl?: string;
	name: string;
	rating: number;
	employeeRange: string;
	followers: number;
	recommendationRate: string;
	isHiring?: boolean;
	hasHighBenefits?: boolean;
	variant: UCardVariant;
}

export default function UCardTopCompany({
	logoUrl,
	name,
	rating,
	employeeRange,
	followers,
	recommendationRate,
	isHiring = false,
	hasHighBenefits = false,
	variant = UCardVariant.Normal,
}: CompanyCardProps) {

	return (
		<div className={`w-80 p-4 ${getStyleCardVariant(variant)} rounded-2xl shadow-sm border w-full`}>
			<div className="flex flex-col items-center">
				<div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full">
					<Image
						src={logoUrl}
						alt={`${name} Logo`}
						fill={true}
						objectFit={"cover"}
						quality={50}
						priority={false}
						loading={"lazy"}
						placeholder={"blur"}
						blurDataURL={"/images/placeholderImage.png"}
					/>
				</div>

				{/* Company Name + Star */}
				<div className={"flex flex-row justify-between items-center w-full"}>
					<h2 className="text-base font-semibold md:text-lg">{name}</h2>

					<div className="mt-1 flex items-center gap-1">
						<StarIcon className="h-4 w-4 text-custom-yellow-3"/>
						<span className="text-sm font-medium text-custom-gray md:text-lg">{rating}</span>
					</div>
				</div>

				{/* Employee Numbers */}
				<div className="mt-4 w-full text-xs text-custom-gray space-y-3 md:text-sm">
					<p>{employeeRange} Nhân Viên</p>
					<p>{followers.toLocaleString()} Followers</p>
					<p className={"text-custom-gray opacity-60"}>{recommendationRate} Tỉ Lệ Đề Xuất Trong 2 Năm Trở Lại</p>
				</div>

				{/* Button Groups */}
				<div className="mt-4 flex flex-col text-sm w-full items-center justify-center
											  sm:text-xs sm:flex-row sm:justify-between
				  							gap-2">
					{isHiring && (
						<div className="rounded-full px-3 py-1 bg-custom-yellow-1 text-custom-blue-2 md:text-sm">
							Đang Tuyển Dụng
						</div>
					)}
					{hasHighBenefits && (
						<div
							className="rounded-full border px-3 py-1 border-custom-blue-3 text-custom-blue-2 md:text-sm">
							Phúc Lợi Cao
						</div>
					)}
				</div>
			</div>
		</div>
	);
}