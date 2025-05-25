import {SearchPaginatedRequestParams} from "@/types/baseModel";
import {createCrudApi} from "@/services/baseApi";
import {Application} from "@/types/application";

// ==================================================

enum ApplicationNameType {
	NameAsc= "nameAsc",
	NameDesc= "nameDesc"
}

export type ApplicationSearchPaginatedRequestParams = {
	sort?: ApplicationNameType;
} & SearchPaginatedRequestParams;

// ==================================================

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