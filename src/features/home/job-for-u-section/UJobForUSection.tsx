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
		jobTitle: "TTS Planner",
		location: "Đường điện Phạm",
		type: "Chủ",
		tag: "Mbps",
		postedTime: "2 ngày trước"
	},
	{
		companyLogo: "https://placehold.co/600x400/png",
		companyName: "Hội kế",
		jobTitle: "TTS Active Adenia",
		location: "Chủ điện, Hướng dẫn",
		type: "linked",
		tag: "Hot",
		postedTime: "3 ngày trước"
	},
];

const UJobForUSection = () => {
	return (
		<div className={"w-full"}>
			<h2 className="text-2xl mb-8 font-semibold text-center text-custom-black uppercase">Công việc Dành Cho bạn</h2>
			<div className="grid grid-cols-2 gap-12 px-12 xl:px-0">
				{jobs.map((job, index) => (
					<UCardJobForU
						key={index}
						companyLogo={job.companyLogo}
						companyName={job.companyName}
						jobTitle={job.jobTitle}
						location={job.location}
						type={job.type}
						tag={job.tag}
						postedTime={job.postedTime}
					/>
				))}
		</div>
		</div>
	);
};

export default UJobForUSection;