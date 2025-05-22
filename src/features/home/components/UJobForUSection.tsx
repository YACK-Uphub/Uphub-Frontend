import UCardJobForU from '@/components/shared/card/UCardJobForU';
import React from 'react';

const jobs = [
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Content Creator",
		location: "Quốc tế TTTB Chỉ Hướng dẫn (PCT Plus)",
		type: "Công trực chủ",
		tag: "Mbps",
		postedTime: "2h trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Designer Router",
		location: "",
		type: "Chủ",
		tag: "Mbps",
		postedTime: "4h trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS UX/UX Designer",
		location: "Quốc tế TTTB Chỉ Hướng dẫn",
		type: "Mbps",
		tag: "Ứng Tuyển Dễ Dàng",
		postedTime: "1 ngày trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Truyền Thông",
		location: "Đường điện Phạm",
		type: "Công trực chủ",
		tag: "Mbps",
		postedTime: "1 ngày trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Truyền Thông",
		location: "Đường điện Phạm",
		type: "Công trực chủ",
		tag: "Mbps",
		postedTime: "1 ngày trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Truyền Thông",
		location: "Đường điện Phạm",
		type: "Công trực chủ",
		tag: "Mbps",
		postedTime: "1 ngày trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Truyền Thông",
		location: "Đường điện Phạm",
		type: "Công trực chủ",
		tag: "Mbps",
		postedTime: "1 ngày trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Truyền Thông",
		location: "Đường điện Phạm",
		type: "Công trực chủ",
		tag: "Mbps",
		postedTime: "1 ngày trước"
	},

];

const UJobForUSection = () => {
	return (
		<>
			<h2 className="mb-8 text-center
										 sm:text-2xl sm:p-4 sm:mb-16 font-bold
										 text-custom-blue-3">Công việc Dành Cho bạn</h2>
			<div className="grid grid-cols-1 gap-10
											sm:grid-cols-2 sm:gap-12
			 								xl:grid-cols-4 xl:gap-12">
				{jobs.map((job, index) => (
					<UCardJobForU key={index} {...job}/>
				))}
			</div>
		</>
	);
};

export default UJobForUSection;