"use client"

import Image from "next/image";
import {DownloadIcon} from "lucide-react";
import UButton from "@/components/shared/UButton";
import {CardVariant, getVariantClass} from "@/components/shared/card/UCardVariant";

export interface UCardApplicationProps {
	name: string;
	role: string;
	experience: string;
	education: string;
	submittedDate: string;
	avatarUrl?: string;
	cvUrl?: string;
	variant: CardVariant;
}

export default function UCardApplication({
	name,
	role,
	experience,
	education,
	submittedDate,
	avatarUrl,
	cvUrl,
	variant = CardVariant.Normal
}: UCardApplicationProps) {

	const onDownloadCv = async () => {
		if (!cvUrl) return;
		alert("Download file CV here");
	}

	return (
		<div className={`w-64 border rounded-xl shadow-md ${getVariantClass(variant)} p-4 space-y-3 text-sm`}>

			{/* Header */}
			<div className="flex items-center gap-3">
				<div className="w-16 h-16 mb-2 relative bg-custom-gray rounded-full overflow-hidden">
					<Image
						src={avatarUrl}
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

				<div>
					<p className="font-medium text-sm text-custom-black">{name}</p>
					<p className="text-xs text-custom-gray opacity-55">{role}</p>
				</div>
			</div>

			{/* Info List */}
			<ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
				<li>{experience} kinh nghiệm</li>
				<li>Trình độ: {education}</li>
				<li>Ngày nộp đơn: {submittedDate}</li>
			</ul>

			{/* Download CV */}
			<UButton
				onClick={onDownloadCv}
				label={"Tải CV"}
				textColor={"text-custom-white"}
				backgroundColor={"bg-custom-blue-2"}
				borderRadius={"rounded-full"}
				icon={<DownloadIcon className="w-4 h-4"/>}
				iconPosition={"left"}>
			</UButton>
		</div>);
}
