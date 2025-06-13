import {Entity, GetAllPaginatedRequestParams} from "@/types/baseModel";

export type Industry = Entity<{
	name: string;
}>

export type IndustrySearchPaginatedRequestParams = {} & GetAllPaginatedRequestParams;
