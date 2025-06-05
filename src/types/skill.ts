import {Entity, GetAllPaginatedRequestParams} from "@/types/baseModel";

export type Skill = Entity<{
	name: string;
}>

export type SkillSearchPaginatedRequestParams = {} & GetAllPaginatedRequestParams;
