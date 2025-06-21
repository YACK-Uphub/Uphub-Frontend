import { GetAllPaginatedRequestParams } from "@/types/baseModel";

export enum UserRole {
	Admin = "Admin",
	StudentBasic = "StudentBasic",
	StudentPro = "StudentPro",
	CompanyBasic = "CompanyBasic",
	CompanyPro = "CompanyPro",
	CompanyEnterprise = "CompanyEnterprise",
	UniversityManager = "UniversityManage",
	Guest = "Guest",
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
	schoolId?: number;
	internshipId?: number;
	internshipStatus?: string;
	jobId?: number;
	jobTitle?: string;
	industry?: string;
	industryId?: number;
	curriculumVitaes?: CurriculumVitae[];
	skills?: Skill[];
};

export type CurriculumVitae = {
	id: number;
	documentUrl: string;
};

export type SocialLink = {
	id?: number;
	name?: string;
	linkUrl?: string;
};
export type LinkToAdd = {
	name: string;
	linkUrl: string;
};

export type Skill = {
	id: number;
	name: string;
};

export type StudentSearchPaginatedRequestParams = {} & GetAllPaginatedRequestParams;
