import {Entity, SearchPaginatedRequestParams} from "@/types/baseModel";

export type Company = Entity<{
	imageUrl: string;
	phoneNumber: string;
	email: string;
	companyName: string;
	organizationType: string;
	establishedDate: string;
	description: string;
	companySize: string;
	vision: string;
	benefit: string;
	websiteUrl: string;
	address: string;
	city: string;
	businessType: string;
}>;

enum CompanyNameType {
	NameAsc = "nameAsc",
	NameDesc = "nameDesc",
}

export type CompanySearchPaginatedRequestParams = {
	sort?: CompanyNameType;
	companyId?: number;
	isLinked?: boolean;
} & SearchPaginatedRequestParams;
