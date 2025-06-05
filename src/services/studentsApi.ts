import { createCrudApi } from "@/services/baseApi";
import {Student, StudentSearchPaginatedRequestParams} from "@/types/user";

export const studentsApi = createCrudApi<Student, StudentSearchPaginatedRequestParams>({
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
