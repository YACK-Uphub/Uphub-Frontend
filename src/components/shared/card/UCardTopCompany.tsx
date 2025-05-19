import StarIcon from "@heroicons/react/24/solid/StarIcon";
import Image from "next/image";
import {CardVariant, getVariantClass} from "@/components/shared/card/UCardVariant";

export interface CompanyCardProps {
	logoUrl?: string;
	name: string;
	rating: number;
	employeeRange: string;
	followers: number;
	recommendationRate: string;
	isHiring?: boolean;
	hasHighBenefits?: boolean;
	variant: CardVariant;
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
	variant = CardVariant.Normal,
}: CompanyCardProps) {

	return (
		<div className={`w-80 p-4 ${getVariantClass(variant)} rounded-2xl shadow-md border`}>
			<div className="flex flex-col items-center">
				<div className="w-16 h-16 mb-2 relative rounded-full overflow-hidden">
					<Image
						src={logoUrl}
						alt={`${name} Logo`}
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

				{/* Company Name + Star */}
				<div className={"flex flex-row justify-between items-center w-full"}>
					<h2 className="text-lg font-semibold">{name}</h2>

					<div className="flex items-center gap-1 mt-1">
						<StarIcon className="w-4 h-4 text-custom-yellow-3"/>
						<span className="text-lg font-medium text-custom-gray">{rating}</span>
					</div>
				</div>

				{/* Employee Numbers */}
				<div className="text-sm text-custom-gray mt-4 w-full space-y-3">
					<p>{employeeRange} Nhân Viên</p>
					<p>{followers.toLocaleString()} Followers</p>
					<p className={"text-custom-gray opacity-60"}>{recommendationRate} Tỉ Lệ Đề Xuất Trong 2 Năm Trở Lại</p>
				</div>

				{/* Button Groups */}
				<div className="flex gap-2 mt-4 w-full">
					{isHiring && (
						<div className="bg-custom-yellow-1 text-custom-blue-2 px-3 py-1 rounded-full text-sm flex-1">
							Đang Tuyển Dụng
						</div>
					)}
					{hasHighBenefits && (
						<button
							className="border border-custom-blue-3 text-custom-blue-2 px-3 py-1 rounded-full text-sm flex-1">
							Phúc Lợi Cao
						</button>
					)}
				</div>
			</div>
		</div>
	);
}