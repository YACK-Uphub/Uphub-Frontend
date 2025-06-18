import {createCrudApi} from "@/services/baseApi";
import {Application, ApplicationSearchPaginatedRequestParams} from "@/types/application";

export const applicationsApi = createCrudApi<Application, ApplicationSearchPaginatedRequestParams>({
	reducerPath: "applicationsApi",
	tagType: "applications",
	baseUrl: "applications",
	searchUrl: "search/applications",
});

export const applicationsApiExtended = applicationsApi.injectEndpoints({
	endpoints: (builder) => ({
		createApplicationWithFormData: builder.mutation<never, FormData>({
			query: (formData) => ({
				url: "applications",
				method: "POST",
				body: formData,
			}),
			invalidatesTags: ["applications"],
		}),
	}),
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

export const {useCreateApplicationWithFormDataMutation} = applicationsApiExtended;
