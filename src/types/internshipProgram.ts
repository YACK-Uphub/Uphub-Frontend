import {Entity, SearchPaginatedRequestParams} from "./baseModel";

export type InternshipProgram = Entity<{
	internshipTerm: string;
	startDate: Date;
	endDate: Date;
	imageUrl?: string;
	name: string;
	description: string;
	agreements: string;
	partnerships: string;
	status: string;
}>;

export enum InternshipProgramSortType {
	endingSoon = "endingSoon",
	upcoming = "upcoming",
}

export type InternshipProgramPaginatedRequestParams = SearchPaginatedRequestParams & {
	sort?: InternshipProgramSortType;
	cityId?: number | string;
};


