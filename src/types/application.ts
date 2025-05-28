import { Entity, SearchPaginatedRequestParams } from "@/types/baseModel";
import { JobStatus } from "./job";

export type Application = Entity<{
	cvUrl: string;
	linkedInUrl: string;
	coverLetter: string;
	introduction: string;
	fullname: string;
	email: string;
	phone: string;
	imageUrl: string;
	status: ApplicationStatus;
	userId: number;
	jobId: number;

	jobStatus: JobStatus;
	jobTitle: string;
}>;

export type ApplicationSearch = Entity<{
	cvUrl: string;
	linkedInUrl: string;
	coverLetter: string;
	introduction: string;
	fullName: string;
	email: string;
	phone: string;
	imageUrl: string;
	status: string;
	jobTitle: string;
	jobIsFeatured: boolean;
	jobIsHighlighted: boolean;
	jobCount: number;
	jobStatus: ApplicationStatus;
	jobId: number;
	userId: number;
}>;

export enum ApplicationNameType {
	NameAsc = "nameAsc",
	NameDesc = "nameDesc",
}

export type ApplicationSearchPaginatedRequestParams = {
	sort?: ApplicationNameType;
	userId?: number;
	jobId?: number;
} & SearchPaginatedRequestParams;

export enum ApplicationStatus {
	Applied = "Applied",
	Scheduled = "Scheduled",
	Interviewed = "Interviewed",
	Rejected = "Rejected",
	Hired = "Hired",
}
