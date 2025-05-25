import {SearchPaginatedRequestParams} from "@/types/baseModel";
import {createCrudApi} from "@/services/baseApi";
import {Company} from "@/types/company";

// ==================================================

enum CompanyNameType {
	NameAsc= "nameAsc",
	NameDesc= "nameDesc"
}

export type CompanySearchPaginatedRequestParams = {
	sort?: CompanyNameType;
	companyId?: number;
} & SearchPaginatedRequestParams;

// ==================================================

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