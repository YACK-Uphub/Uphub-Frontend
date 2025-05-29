"use client"

import Image from "next/image";
import {DownloadIcon} from "lucide-react";
import UButton from "@/components/shared/UButton";
import {getStyleCardVariant, UCardVariant} from "@/components/shared/card/UCardVariant";

export interface UCardApplicationProps {
	name: string;
	role: string;
	experience: string;
	education: string;
	submittedDate: string;
	avatarUrl?: string;
	cvUrl?: string;
	variant: UCardVariant;
}

export default function UCardApplication({
	name,
	role,
	experience,
	education,
	submittedDate,
	avatarUrl,
	cvUrl,
	variant = UCardVariant.Normal
}: UCardApplicationProps) {

	const onDownloadCv = async () => {
		if (!cvUrl) return;
		alert("Download file CV here");
	}

	return (
		<div className={`w-full border rounded-xl shadow-md ${getStyleCardVariant(variant)} p-4 space-y-3 text-sm`}>

			{/* Header */}
			<div className="flex items-center gap-3">
				<div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full bg-custom-gray">
					<Image
						src={avatarUrl}
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

				<div>
					<p className="text-lg font-medium text-custom-black">{name}</p>
					<p className="text-sm text-custom-gray opacity-55">{role}</p>
				</div>
			</div>

			{/* Info List */}
			<ul className="list-inside list-disc text-sm text-gray-700 space-y-1">
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
				icon={<DownloadIcon className="h-4 w-4"/>}
				iconPosition={"left"}>
			</UButton>
		</div>);
}
