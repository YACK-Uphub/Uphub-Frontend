export type BaseEntity = {
	id: string | number;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export type Entity<T> = {
	[K in keyof T]: T[K];
} & BaseEntity;

export type PaginatedResponse<T extends BaseEntity> = {
	data: T[];
	pageIndex?: number;
	pageSize?: number;
	count?: number;
}

export type SearchPaginatedResponse<T extends BaseEntity> = {
	results: T[],
	pageCount: number | null,
	totalCount: number | null,
}

export type SearchPaginatedRequestParams = {
	pageNumber?: number,
	pageSize?: number,
	searchTerm?: string;
}

export type GetAllPaginatedRequestParams = {
	pageIndex?: number;
	pageSize?: number;
}
