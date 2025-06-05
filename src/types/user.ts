import {GetAllPaginatedRequestParams} from "@/types/baseModel";

export enum UserRole {
	Student = "student",
	Admin = "admin",
	Company = "company",
	School = "school",
	Guest = "guest",
}
export type User = {
	id: number;
	userName: string;
	email: string;
	phoneNumber: string;
	imageUrl?: string;
	dateOfBirth?: string;
	socialLinks?: SocialLink[];
};

export type Student = User & {
	firstName: string;
	lastName: string;
	code: string;
	biography?: string;
	gender?: string;
	school: string;
	industry: string;
	industryId?: number;
	curriculumVitaes?: CurriculumVitae[]
};

export type CurriculumVitae = {
	id: number;
	documentUrl: string;
};

export type SocialLink = {
	id: number;
	name: string;
	linkUrl: string;
};

export type StudentSearchPaginatedRequestParams = {} & GetAllPaginatedRequestParams;
