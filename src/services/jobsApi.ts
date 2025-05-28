import { createCrudApi } from "@/services/baseApi";
import { Job, JobSearchPaginatedRequestParams } from "@/types/job";

export const jobsApi = createCrudApi<Job, JobSearchPaginatedRequestParams>({
	reducerPath: "jobsApi",
	tagType: "jobs",
	baseUrl: "jobs",
	searchUrl: "search/jobs",
});

export const {
	useGetByIdQuery: useGetJobByIdQuery,
	useGetAllQuery: useGetAllJobsQuery,
	useSearchQuery: useSearchJobsQuery,
	useCreateMutation: useCreateJobMutation,
	useUpdateMutation: useUpdateJobMutation,
	useDeleteMutation: useDeleteJobMutation,

	// Lazy queries
	useLazyGetByIdQuery: useLazyGetJobByIdQuery,
	useLazySearchQuery: useLazySearchJobsQuery,
} = jobsApi;
