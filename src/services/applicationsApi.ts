import {createApi} from "@reduxjs/toolkit/query/react";
import {Application, ApplicationSearch} from "@/types/application";
import {PaginatedResponse, SearchPaginatedRequestParams, SearchPaginatedResponse} from "@/types/baseModel";
import {customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";

// =====================================================================

export interface GetApplicationParams {
	jobId?: string | number;
	userId?: string | number;
	pageIndex?: number;
	pageSize?: number;
}

// =====================================================================

export const applicationApi = createApi({
	reducerPath: 'applicationApi',

	baseQuery: customFetchBaseQueryWithErrorHandling,

	endpoints: (builder) => ({

		// GET: /applications?jobId=1&userId=1&pageIndex=3&pageSize=10
		getApplications: builder.query<PaginatedResponse<Application>, GetApplicationParams>({
			query: (params) => ({
				url: 'applications',
				method: "GET",
				params: {
					...params,
					pageIndex: params.pageIndex ?? 1,
					pageSize: params.pageSize ?? 5,
				},
			}),
		}),

		// GET: /applications/23
		getApplicationById: builder.query<Application, number | string>({
			query: (id) => ({
				url: `applications/${id}`,
				method: 'GET',
			})
		}),

		// GET: /search/applications?sort=nameAsc&pageNumber=1&pageSize=3&searchTerm=zalo
		getSearchApplications: builder.query<SearchPaginatedResponse<ApplicationSearch>, SearchPaginatedRequestParams>({
			query: (params) => ({
				url: "search/applications",
				method: "GET",
				params: {
					...params,
					pageNumber: params.pageNumber ?? 1,
					pageSize: params.pageSize ?? 5,
				}
			})
		}),
	})
})

export const {
	useGetApplicationsQuery,
	useLazyGetApplicationByIdQuery,
	useGetSearchApplicationsQuery,
	useLazyGetSearchApplicationsQuery,
} = applicationApi