import {Entity, SearchPaginatedRequestParams} from "@/types/baseModel";
import {JobStatus} from "./job";

export type Application = Entity<{
	cvUrl: string;
	linkedInUrl: string;
	coverLetter: string;
	introduction: string;
	fullName: string;
	email: string;
	phone: string;
	imageUrl: string;
	status: ApplicationStatus;
	userId: number;
	jobId: number;
	jobStatus: JobStatus;
	jobTitle: string;
	city: string;
	companyImageUrl: string;
	salaryRange: string;
	jobType: string;
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

