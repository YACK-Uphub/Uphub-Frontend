import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Application} from "@/types/application";
import {PaginatedResponse} from "@/types/baseModel";

export interface GetApplicationParams {
	jobId?: string | number;
	userId?: string | number;
	pageIndex?: number;
	pageSize?: number;
}

export const applicationApi = createApi({
	reducerPath: 'applicationApi',

	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:6001/"}),

	// GET: /applications?jobId=1&userId=1&pageIndex=3&pageSize=10
	endpoints: (builder) => ({
		getApplications: builder.query<PaginatedResponse<Application>, GetApplicationParams>({
			query: (params) => ({
				url: 'applications',
				method: "GET",
				params: {
					...params,
					pageIndex: params.pageIndex ?? 1,
					pageSize: params.pageSize ?? 10,
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