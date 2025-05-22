import {Entity} from "./baseModel";

export type Job = Entity<{
	title: string;
	companyImageUrl?: string;
	city: string;
	description?: string;
	requirements?: string;
	closingDate: Date;
	salaryRange: string;
	count?: number;
	isFeatured: boolean;
	isHighlighted: boolean;
	contactEmail?: string;
	contactPhone?: string;
	jobStatus: JobStatus;
	companyId: number;
	jobType: string;
	industry?: string;
	skills?: string[];
	applicationCount?: number;
}>;

export enum JobStatus {
	Open = "Open",
	Closed = "Closed",
	Paused = "Paused",
	Archived = "Archived",
}


