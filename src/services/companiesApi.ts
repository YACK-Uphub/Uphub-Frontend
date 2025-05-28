import { createCrudApi } from "@/services/baseApi";
import { Company, CompanySearchPaginatedRequestParams } from "@/types/company";

export const companiesApi = createCrudApi<Company, CompanySearchPaginatedRequestParams>({
	reducerPath: "companiesApi",
	tagType: "companies",
	baseUrl: "companies",
	searchUrl: "search/companies",
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
