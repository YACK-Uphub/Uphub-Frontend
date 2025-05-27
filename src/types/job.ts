import { Entity, SearchPaginatedRequestParams } from "./baseModel";

export type Job = Entity<{
	id: number;
	title: string;
	companyImageUrl?: string;
	companyName: string;
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

export type SearchJobParams = SearchPaginatedRequestParams & {
	companyId?: number;
	userJobStatus?: string;
};
