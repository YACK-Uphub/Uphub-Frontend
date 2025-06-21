import { createCrudApi } from "@/services/baseApi";
import { Student, StudentSearchPaginatedRequestParams } from "@/types/user";

export const studentsApi = createCrudApi<Student, StudentSearchPaginatedRequestParams>({
	reducerPath: "studentsApi",
	tagType: "students",
	baseUrl: "students",
	searchUrl: "search/students",
});

export const extendedStudentsApi = studentsApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadImage: builder.mutation<object, { id: string | number; body: FormData }>({
			query: ({ id, body }) => ({
				url: `students/${id}/image`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "students" as const, id }, "students"],
		}),
	}),
});

export const {
	useGetByIdQuery: useGetStudentByIdQuery,
	useGetAllQuery: useGetAllStudentsQuery,
	useSearchQuery: useSearchStudentsQuery,
	useCreateMutation: useCreateStudentMutation,
	useUpdateMutation: useUpdateStudentMutation,
	useDeleteMutation: useDeleteStudentMutation,

	// Lazy queries
	useLazyGetByIdQuery: useLazyGetStudentByIdQuery,
	useLazySearchQuery: useLazySearchStudentsQuery,
} = studentsApi;

export const { useUploadImageMutation } = extendedStudentsApi;
