import {SearchPaginatedRequestParams} from "@/types/baseModel";
import {createCrudApi} from "@/services/baseApi";
import {Job} from "@/types/job";

// ==================================================

enum JobDateType {
	DateAsc= "dateAsc",
	DateDesc = "dateDesc",
	ClosingSoon = "closingSoon"
}

export type JobSearchPaginatedRequestParams = {
	sort?: JobDateType;
	companyId?: number;
} & SearchPaginatedRequestParams;

// ==================================================

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
