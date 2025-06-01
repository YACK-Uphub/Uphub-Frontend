export enum UserRole {
	Student = "student",
	Admin = "admin",
	Company = "company",
	School = "school",
	Guest = "guest",
}
export type User = {
	username: string;
	email: string;
	phone: string;
	imageUrl?: string;
	socialLink: SocialLink[];
};

export type Student = User & {
	firstname: string;
	lastname: string;
	code: string;
	biography?: string;
	gender?: string;
	school: string;
	industry: string;
};

export type SocialLink = {
	id: number;
	name: string;
	linkUrl: string;
};
