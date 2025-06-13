// services/jobTypesApi.ts
import {createCrudApi} from "@/services/baseApi";
import {JobType, JobTypeSearchPaginatedRequestParams} from "@/types/jobtype";

export const jobTypesApi = createCrudApi<JobType, JobTypeSearchPaginatedRequestParams>({
	reducerPath: "jobTypesApi",
	tagType: "JobType",
	baseUrl: "job-types",
	searchUrl: "search/job-types",
});

export const {
	useGetByIdQuery: useGetJobTypeByIdQuery,
	useGetAllQuery: useGetAllJobTypesQuery,
	useCreateMutation: useCreateJobTypeMutation,
	useUpdateMutation: useUpdateJobTypeMutation,
	useDeleteMutation: useDeleteJobTypeMutation,
	useLazyGetByIdQuery: useLazyGetJobTypeByIdQuery,
} = jobTypesApi;
