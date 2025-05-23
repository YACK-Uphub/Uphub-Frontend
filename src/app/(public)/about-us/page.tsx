import React from 'react';
import type {Metadata} from 'next';
import {UDropdownItem} from "@/components/shared/search/USearchWithFilter";
import {Job, JobStatus} from "@/types/job";

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

const AboutUsPage = () => {
	return (
		<>
			<h1>About Us</h1>
			<p>Learn more about UpHub, our mission, and our team.</p>
		</>
	)
};

export default AboutUsPage;
