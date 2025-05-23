import {Entity} from "@/types/baseModel";

export type Company = Entity<{
	imageUrl: string
	phoneNumber: string
	email: string
	companyName: string
	organizationType: string
	establishedDate: string
	description: string
	companySize: string
	vision: string
	benefit: string
	websiteUrl: string
	address: string
	city: string
	businessType: string
}>;

