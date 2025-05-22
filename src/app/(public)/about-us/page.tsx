import React from 'react';
import type {Metadata} from 'next';

import USearchWithFilterWrapper from "@/components/shared/search/USearchWithFilterWrapper";
import {UDropdownItem} from "@/components/shared/search/USearchWithFilter";
import UCardTopCompany from "@/components/shared/card/UCardTopCompany";
import {UCardVariant} from "@/components/shared/card/UCardVariant";
import UCardApplication from "@/components/shared/card/UCardApplication";
import {UCardJob} from "@/components/shared/card/UCardJob";
import UJobRow from "@/components/shared/table/UJobRow";
import {Job, JobStatus} from "@/models/job";
import {URowVariant} from "@/components/shared/table/URowVariant";
import UCardJobForU from "@/components/shared/card/UCardJobForU";

const locations: UDropdownItem[] = [
	{id: 1, name: 'Hà Nội'},
	{id: 2, name: 'Hồ Chí Minh'},
]

const job: Job = {
	id: 1,
	title: "Frontend Developer",
	companyImageUrl: "https://placehold.co/600x400/png",
	city: "Hanoi",
	description: "We are looking for a skilled frontend developer to join our growing tech team.",
	requirements: "- 2+ years experience\n- Proficient in React.js\n- Familiar with TypeScript",
	closingDate: new Date("2025-06-30"),
	salaryRange: "$1,500 - $2,000",
	count: 5,
	isFeatured: true,
	isHighlighted: false,
	contactEmail: "hr@company.com",
	contactPhone: "+84 123 456 789",
	jobStatus: JobStatus.Open,
	companyId: 101,
	jobType: "Full-time",
	industry: "Software Development",
	createdAt: new Date("2025-05-10"),
	updatedAt: new Date("2025-05-18"),
	skills: ["React", "TypeScript", "CSS", "REST API"],
	applicationCount: 32,
};

export const metadata: Metadata = {
	title: "About Us",
	description: "Learn more about UpHub and our mission",
};


const AboutUsPage = async () => {

	return (
		<div>
			<h1>About Us</h1>
			<p>Learn more about UpHub, our mission, and our team.</p>
			<USearchWithFilterWrapper dropdownData={locations}></USearchWithFilterWrapper>

			<UCardTopCompany logoUrl="https://placehold.co/600x400/png"
											 name="NAVA Company"
											 rating={4.7}
											 employeeRange="10.000 - 100.000"
											 followers={6968877}
											 recommendationRate="74%"
											 isHiring={true}
											 hasHighBenefits={true}
											 variant={UCardVariant.Border}

			/>

			<UCardApplication
				name="Lê Quang Khánh"
				role="Fullstack Developer"
				experience="7 năm"
				education="Đại học"
				submittedDate="01-03-2025"
				avatarUrl={"https://placehold.co/600x400/png"}
				cvUrl={"https://placehold.co/600x400/png"}
				variant={UCardVariant.Normal}
			/>

			<UCardJob
				companyLogoUrl="https://placehold.co/600x400/png"
				companyName="Freepik"
				isFeatured={true}
				location="China"
				jobTitle="TTS Visual Designer"
				jobType="Full Time"
				salaryRange="$10K-$15K"
				variant={UCardVariant.LightBlue}/>

			<UJobRow
				variant={URowVariant.Selected}
				ownerView={false}
				isApplied={true}
				job={job}
			></UJobRow>

			<UCardJobForU
				companyLogo="https://placehold.co/600x400/png"
				companyName="ASMA Company"
				jobTitle="TTS Content Creator"
				location="Quận 2, TP Hồ Chí Minh"
				type="Full Time"
				tag="Ứng Tuyển Dễ Dàng"
				postedTime="1d"
			/>

		</div>
	)
};

export default AboutUsPage;
