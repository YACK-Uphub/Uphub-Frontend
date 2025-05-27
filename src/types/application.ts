import {Entity, SearchPaginatedRequestParams} from "@/types/baseModel";

export type Application = Entity<{
	cvUrl: string
	linkedInUrl: string
	coverLetter: string
	introduction: string
	fullName: string
	email: string
	phone: string
	imageUrl: string
	status: string
	jobTitle: string
	jobIsFeatured: boolean
	jobIsHighlighted: boolean
	jobCount: number
	jobStatus: string
	jobId: number
	userId: number
}>

export enum ApplicationNameType {
	NameAsc = "nameAsc",
	NameDesc = "nameDesc"
}

export type ApplicationSearchParams = {
	sort?: ApplicationNameType;
} & SearchPaginatedRequestParams;