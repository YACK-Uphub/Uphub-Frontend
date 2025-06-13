import {Entity, SearchPaginatedRequestParams} from "./baseModel";

export type Job = Entity<{
	title: string;
	companyImageUrl?: string;
	companyName: string;
	city: string;
	description?: string;
	requirements?: string;
	closingDate: string;
	salaryRange: string;
	count?: number;
	isFeatured: boolean;
	isHighlighted: boolean;
	contactEmail?: string;
	contactPhone?: string;
	jobStatus: JobStatus;
	companyId?: number;
	jobTypeId?: number
	industryId?: number
	skillIds?: number[]
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

export enum JobDateType {
	DateAsc = "dateAsc",
	DateDesc = "dateDesc",
	ClosingSoon = "closingSoon",
}

export type JobSearchPaginatedRequestParams = SearchPaginatedRequestParams & {
	companyId?: number;
	userJobStatus?: string;
	sort?: JobDateType;
	cityId?: number | string;
};
