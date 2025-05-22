import React from 'react';
import {UCardVariant} from '@/components/shared/card/UCardVariant';
import UCardTopCompany from "@/components/shared/card/UCardTopCompany";

const companies = [] = [
	{
		logoUrl: "https://placehold.co/600x400/png",
		name: "Công Ty TNHH TechVision",
		rating: 4.5,
		employeeRange: "501-1000",
		followers: 12500,
		recommendationRate: "88%",
		isHiring: true,
		hasHighBenefits: true,
		variant: UCardVariant.Normal
	},
	{
		logoUrl: "https://placehold.co/600x400/png",
		name: "Tập Đoàn FPT",
		rating: 4.2,
		employeeRange: "5001-10,000",
		followers: 34200,
		recommendationRate: "85%",
		isHiring: true,
		hasHighBenefits: false,
		variant: UCardVariant.Normal
	},
	{
		logoUrl: "https://placehold.co/600x400/png",
		name: "Công Ty VNG",
		rating: 4.7,
		employeeRange: "1001-5000",
		followers: 28900,
		recommendationRate: "92%",
		isHiring: false,
		hasHighBenefits: true,
		variant: UCardVariant.Normal
	},
	{
		logoUrl: "https://placehold.co/600x400/png",
		name: "Công Ty TNHH Shopee",
		rating: 3.9,
		employeeRange: "201-500",
		followers: 18700,
		recommendationRate: "78%",
		isHiring: true,
		hasHighBenefits: true,
		variant: UCardVariant.Normal
	}
];

const UTopCompaniesSection = () => {
	return (
		<>
			<h2 className="mb-8 text-center text-2xl font-semibold uppercase text-custom-black">Công việc Dành Cho bạn</h2>
			<div className="grid grid-cols-1 gap-10 px-12
											sm:grid-cols-2 sm:gap-12
			 								xl:grid-cols-4 xl:gap-12 xl:px-0">
				{companies.map((company, index) => (
					<UCardTopCompany key={index}
													 {...company}/>

				))}
			</div>
		</>
	);
};

export default UTopCompaniesSection;