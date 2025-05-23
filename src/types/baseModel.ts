export type SearchPaginatedType = "nameAsc" | "nameDesc";

type BaseEntity = {
	id: string | number;
	createdAt?: Date;
	updatedAt?: Date;
}

export type Entity<T> = {
	[K in keyof T]: T[K];
} & BaseEntity;

export type PaginatedResponse<T> = {
	data: T[];
	pageIndex: number;
	pageSize: number;
	count: number;
}

export type SearchPaginatedResponse<T> = {
	"results": T[],
	"pageCount": number,
	"totalCount": number
}

export interface SearchPaginatedRequestParams {
	sort?: SearchPaginatedType;
	pageNumber?: number;
	pageSize?: number;
	searchTerm?: string;
	companyId?: number;
}