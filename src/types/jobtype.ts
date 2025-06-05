import {Entity, GetAllPaginatedRequestParams} from "@/types/baseModel";

export type JobType = Entity<{
	name: string;
}>

export type JobTypeSearchPaginatedRequestParams = {} & GetAllPaginatedRequestParams;
