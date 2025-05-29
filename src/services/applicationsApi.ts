import {createCrudApi} from "@/services/baseApi";
import {Application, ApplicationSearchPaginatedRequestParams} from "@/types/application";

export const applicationsApi = createCrudApi<Application, ApplicationSearchPaginatedRequestParams>({
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