import {createApi} from "@reduxjs/toolkit/query/react";
import {Application} from "@/types/application";
import {PaginatedResponse} from "@/types/baseModel";
import {customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";

export interface GetApplicationParams {
	jobId?: string | number;
	userId?: string | number;
	pageIndex?: number;
	pageSize?: number;
}

export const applicationApi = createApi({
	reducerPath: 'applicationApi',

	baseQuery: customFetchBaseQueryWithErrorHandling,

	// GET: /applications?jobId=1&userId=1&pageIndex=3&pageSize=10
	endpoints: (builder) => ({
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
		})
	})
})

export const {
	useGetApplicationsQuery,
	useLazyGetApplicationByIdQuery
} = applicationApi