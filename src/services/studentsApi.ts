import { createCrudApi } from "@/services/baseApi";
import { SearchPaginatedRequestParams } from "@/types/baseModel";
import { Student } from "@/types/user";

export const studentsApi = createCrudApi<Student, SearchPaginatedRequestParams>({
	reducerPath: "studentsApi",
	tagType: "students",
	baseUrl: "students",
	searchUrl: "search/students",
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
