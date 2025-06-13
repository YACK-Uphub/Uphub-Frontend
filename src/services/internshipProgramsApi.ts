import {createCrudApi} from "@/services/baseApi";
import {InternshipProgram, InternshipProgramPaginatedRequestParams} from "@/types/internshipProgram";

export const internshipProgramsApi = createCrudApi<InternshipProgram, InternshipProgramPaginatedRequestParams>({
	reducerPath: "internshipProgramsApi",
	tagType: "internshipPrograms",
	baseUrl: "intern-programs",
	searchUrl: "search/intern-programs",
});

export const {
	useGetByIdQuery: useGetInternshipProgramByIdQuery,
	useGetAllQuery: useGetAllInternshipProgramsQuery,
	useSearchQuery: useSearchInternshipProgramsQuery,
	useCreateMutation: useCreateInternshipProgramMutation,
	useUpdateMutation: useUpdateInternshipProgramMutation,
	useDeleteMutation: useDeleteInternshipProgramMutation,

	// Lazy queries
	useLazyGetByIdQuery: useLazyGetInternshipProgramByIdQuery,
	useLazySearchQuery: useLazySearchInternshipProgramsQuery,
} = internshipProgramsApi;
