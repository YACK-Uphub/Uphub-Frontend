export enum UserRole {
	Student = "student",
	Admin = "admin",
	Company = "company",
	School = "school",
	Guest = "guest",
}
export type User = {
	id: number;
	username: string;
	email: string;
	phoneNumber: string;
	imageUrl?: string;
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
	curriculumVitaes?: CurriculumVitae[];
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
