import {Entity} from "@/types/baseModel";

export type Application = Entity<{
	cvUrl: string
	linkedInUrl: string
	coverLetter: string
	introduction: string
	fullname: string
	email: string
	phone: string
	imageUrl: string
	status: string
	userId: number
	jobId: number
}>;

export type ApplicationSearch = Entity<{
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