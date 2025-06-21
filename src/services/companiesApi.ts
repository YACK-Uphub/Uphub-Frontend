import { createCrudApi } from "@/services/baseApi";
import { Company, CompanySearchPaginatedRequestParams } from "@/types/company";

export const companiesApi = createCrudApi<Company, CompanySearchPaginatedRequestParams>({
	reducerPath: "companiesApi",
	tagType: "companies",
	baseUrl: "companies",
	searchUrl: "search/companies",
});

export const extendedCompaniesApi = companiesApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadCompanyImage: builder.mutation<object, { id: string | number; body: FormData }>({
			query: ({ id, body }) => ({
				url: `companies/${id}/image`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: ["companies"],
		}),
	}),
});

export const {
	useGetByIdQuery: useGetCompanyByIdQuery,
	useGetAllQuery: useGetAllCompaniesQuery,
	useSearchQuery: useSearchCompaniesQuery,
	useCreateMutation: useCreateCompanyMutation,
	useUpdateMutation: useUpdateCompanyMutation,
	useDeleteMutation: useDeleteCompanyMutation,

	// Lazy queries
	useLazyGetByIdQuery: useLazyGetCompanyByIdQuery,
	useLazySearchQuery: useLazySearchCompaniesQuery,
} = companiesApi;

export const { useUploadCompanyImageMutation } = extendedCompaniesApi;
