"use client"

import React from 'react';
import USearchWithFilter from "@/components/shared/search/USearchWithFilter";
import {BriefcaseIcon, BuildingOffice2Icon, UserPlusIcon, UsersIcon} from "@heroicons/react/24/outline";
import UJobStatCard from "@/features/home/hero-section/UJobStatCard";
import Image from "next/image";

import illustrationImg from "@/../public/images/illustration.png";

const statCardsData = [
	{
		icon: <BriefcaseIcon className="h-6 w-6 text-custom-blue-3"/>,
		value: '7,532',
		label: 'Công việc mới',
	},
	{
		icon: <BuildingOffice2Icon className="h-6 w-6 text-custom-white"/>,
		value: '12,430',
		label: 'Người dùng đăng ký',
	},
	{
		icon: <UsersIcon className="h-6 w-6 text-custom-blue-3"/>,
		value: '84',
		label: 'Quốc gia hoạt động',
	},
	{
		icon: <UserPlusIcon className="h-6 w-6 text-custom-blue-3"/>,
		value: '3,218',
		label: 'Bình luận mới',
	},
]

const UHeroSection = () => {
	return (
		<div className={"pt-12 pb-12 px-12 max-w-full"}>
			<div className="mx-auto flex max-w-6xl flex-col items-center gap-8 xl:flex-row">

				{/* Text Content - Left Side */}
				<div className="flex-1 space-y-5 shrink min-w-0">
					<h1 className="text-3xl font-bold text-custom-black md:text-4xl">
						Khởi đầu trải nghiệm:<br/>
						<span className="text-custom-blue-2">Kết nối nhân tài với cơ hội lý tưởng</span>
					</h1>

					<h3 className="text-xl text-custom-gray">Vững vàng hành trang, tương lai rộng mở</h3>

					<USearchWithFilter
						dropdownData={null}
						onSearchSubmit={null}
					/>

					<p className="text-custom-gray">
						<span className="font-medium text-custom-gray/50">Gợi ý:</span> Designer, Lập trình viên,
						<span className="font-medium text-custom-blue-2"> Digital Marketing</span>, Editor, ...
					</p>
				</div>

				{/* Image - Right Side */}
				<div className="flex flex-1 h-full w-full max-w-md shrink-0">
					<Image
						src={illustrationImg}
						alt="uphub hero icon"
						className="w-full object-cover"
						loading="lazy"
						quality={100}
					/>
				</div>
			</div>

			{/* Stats Container */}
			<div className={"m-auto mt-8 w-full"}>
				<h2 className="text-2xl mb-4 font-semibold text-center text-custom-black">Cơ hội việc làm độc quyền</h2>
				<div className={"flex gap-4 justify-center flex-wrap"}>
					{statCardsData.map((card, index) =>
						(
							<UJobStatCard
								key={index}
								isCompany={index !== 1}
								icon={card.icon}
								stat={card.value}
								jobLabel={card.label}
							/>
						) 
					)}
				</div>
			</div>
		</div>
	);
};

export default UHeroSection;