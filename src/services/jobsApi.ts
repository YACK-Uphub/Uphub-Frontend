import { createApi } from "@reduxjs/toolkit/query/react";
import { SearchPaginatedRequestParams, SearchPaginatedResponse } from "@/types/baseModel";
import { customFetchBaseQueryWithErrorHandling } from "@/services/baseApi";
import { Job } from "@/types/job";

export const jobApi = createApi({
	reducerPath: "jobApi",

	baseQuery: customFetchBaseQueryWithErrorHandling,

	endpoints: (builder) => ({
		// GET: /jobs/23
		getJobsById: builder.query<Job, number | string>({
			query: (id) => ({
				url: `jobs/${id}`,
				method: "GET",
			}),
		}),

		// GET: /search/jobs?sort=closingSoon&searchTerm=Frontend&pageNumber=1&companyId=7&pageSize=3
		getSearchJobs: builder.query<SearchPaginatedResponse<Job>, SearchPaginatedRequestParams>({
			query: (params) => ({
				url: "search/jobs",
				method: "GET",
				params: {
					...params,
					pageNumber: params.pageNumber ?? 1,
					pageSize: params.pageSize ?? 5,
				},
			}),
		}),
	}),
});

export const {
	useGetJobsByIdQuery,
	useGetSearchJobsQuery,
	useLazyGetJobsByIdQuery,
	useLazyGetSearchJobsQuery
} = jobApi;
