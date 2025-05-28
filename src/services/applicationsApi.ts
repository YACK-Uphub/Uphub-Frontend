import {createCrudApi} from "@/services/baseApi";
import {Application, ApplicationSearchPaginatedREquestParams} from "@/types/application";

export const applicationsApi = createCrudApi<Application, ApplicationSearchPaginatedREquestParams>({
	reducerPath: "applicationsApi",
	tagType: "applications",
	baseUrl: "applications",
	searchUrl: "search/applications",
});

export const {
	useGetByIdQuery: useGetApplicationByIdQuery,
	useGetAllQuery: useGetAllApplicationsQuery,
	useSearchQuery: useSearchApplicationsQuery,
	useCreateMutation: useCreateApplicationMutation,
	useUpdateMutation: useUpdateApplicationMutation,
	useDeleteMutation: useDeleteApplicationMutation,

	// Lazy queries
	useLazyGetByIdQuery: useLazyGetApplicationByIdQuery,
	useLazySearchQuery: useLazySearchApplicationsQuery,
} = applicationsApi;