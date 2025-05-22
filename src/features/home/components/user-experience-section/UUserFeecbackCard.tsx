import Image from "next/image";
import React from "react";
import {StarIcon as SolidStarIcon} from "@heroicons/react/24/solid";
import {StarIcon as OutlineStarIcon} from "@heroicons/react/24/outline";

interface UUserFeedbackCardProps {
	quote: string;
	userName: string;
	userTitle: string;
	avatarUrl: string;
	rating: number;
}

const UUserFeedbackCard = ({
	quote,
	userName,
	userTitle,
	avatarUrl,
	rating,
}: UUserFeedbackCardProps) => {
	return (
		<div
			className={`w-full h-full p-6 bg-custom-white 
									rounded-xl shadow-md flex flex-col
									transition-shadow duration-300`}>

			{/* Rating section */}
			<div className={"flex flex-1 justify-end"}>
				{[...Array(5)].map((_, i) => (
					i < rating
						? <SolidStarIcon key={i} className="h-6 w-6 text-custom-yellow-3"></SolidStarIcon>
						: <OutlineStarIcon key={i} className="h-6 w-6 text-custom-gray/10"></OutlineStarIcon>
				))}
			</div>

			{/* Quote section */}
			<div className="my-4 flex-3">
				<p className="italic text-custom-gray text-md">{quote}</p>
			</div>

			{/* Divider */}
			<div className="my-4 border-t border-custom-gray/30"></div>

			{/* User info section */}
			<div className={"flex gap-4"}>
				<div className={"relative w-12 h-12"}>
					<Image
						src={avatarUrl}
						alt={userName}
						fill={true}
						objectFit={"cover"}
						className="rounded-full"
					/>
				</div>

				<div className="flex flex-col">
					<span className="font-semibold text-custom-black">{userName}</span>
					<span className="text-sm text-custom-gray">{userTitle}</span>
				</div>
			</div>
		</div>
	);
};

export default UUserFeedbackCard;