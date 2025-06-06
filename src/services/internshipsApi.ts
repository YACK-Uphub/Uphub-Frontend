import {createCrudApi, customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";
import {Internship, InternshipCreateRequestParams, InternshipPaginatedRequestParams} from "@/types/internship";
import {createApi} from "@reduxjs/toolkit/query/react";

// ===========================
// Generic template
// ===========================

export const internshipsApi = createCrudApi<Internship, InternshipPaginatedRequestParams>({
	reducerPath: "internshipApi",
	tagType: "internship",
	baseUrl: "internships",
	searchUrl: "search/internships",
});

export const {
	useSearchQuery: useSearchInternshipProgramsQuery,
} = internshipsApi;

// ===========================
// Specific Generic Internship
// ===========================

export const createInternshipsApi = createApi({
	reducerPath: "createInternshipApi",
	baseQuery: customFetchBaseQueryWithErrorHandling,
	endpoints: (builder) => ({
		createInternship: builder.mutation<Internship, InternshipCreateRequestParams>({
			query: (body) => ({
				url: `/internships`,
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body,
			}),
		}),
	}),
});

export const {
	useCreateInternshipMutation
} = createInternshipsApi;

