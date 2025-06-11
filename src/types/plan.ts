import {Entity, SearchPaginatedRequestParams} from "@/types/baseModel";

export type Plan = Entity<{
	name: string
	description: string
	price: number
	jobPostLimit: number
	featuredJob: boolean
	highlightJob: boolean
	cvReview: boolean
	status: string
	role: string
}>

export enum PlanRoleEnum {
	Student = "student",
	Company = "company",
}

export type PlanSearchPaginatedRequestParams = SearchPaginatedRequestParams & {
	role: PlanRoleEnum
};
