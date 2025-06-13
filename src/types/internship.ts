import {Entity, SearchPaginatedRequestParams} from "@/types/baseModel";

export type Internship = Entity<{
	score: number
	comment: string
	internshipStatus: string
	internshipProgramId: number
	userId: number
	studentCode: string
	studentFullName: string
	studentImageUrl: string
	studentEmail: string
	studentPhone: string
	jobId: number
	jobTitle: string
	companyId: number
	companyName: string
	companyImageUrl: string
}>

export enum InternshipSort {
	NameAsc = "nameAsc",
	NameDesc = "nameDesc",
	ScoreAsc = 'scoreAsc',
	ScoreDesc = "scoreDesc",
}

export enum InternshipStatus {
	Completed = "Completed",
	InProgress = "InProgress",
	Failed = "Failed",
	NotStarted = "NotStarted"
}

export type InternshipPaginatedRequestParams = {
	sort?: InternshipSort,
	status?: InternshipStatus
} & SearchPaginatedRequestParams;

export type InternshipCreateRequestParams = {
	userId?: number | string;
	jobId?: number | string;
	internshipProgramId?: number | string;
}
