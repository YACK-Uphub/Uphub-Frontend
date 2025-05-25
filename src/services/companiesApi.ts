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

// export const companyApi = createApi({
// 	reducerPath: 'companyApi',
//
// 	baseQuery: customFetchBaseQueryWithErrorHandling,
//
// 	endpoints: (builder) => ({
//
// 		// GET: /companies/11
// 		getCompanyById: builder.query<Company, number | string>({
// 			query: (id) => ({
// 				url: `companies/${id}`,
// 				method: 'GET',
// 			})
// 		}),
//
// 		// GET: /search/companies?sort=nameAsc&pageNumber=1&pageSize=3&searchTerm=Công ty TNHH
// 		getSearchCompanies: builder.query<SearchPaginatedResponse<Company>, CompanySearchPaginatedRequestParams>({
// 			query: (params) => ({
// 				url: "search/companies",
// 				method: "GET",
// 				params: {
// 					...params,
// 					pageNumber: params.pageNumber ?? 1,
// 					pageSize: params.pageSize ?? 5,
// 				}
// 			})
// 		}),
// 	})
// })
//
// export const {
// 	useLazyGetCompanyByIdQuery,
// 	useGetCompanyByIdQuery,
// 	useLazyGetSearchCompaniesQuery,
// 	useGetSearchCompaniesQuery,
// } = companyApi

export const companyApi = createCrudApi<Company, CompanySearchPaginatedRequestParams>({
	reducerPath: "companyApi",
	tagType: "companies",
	baseUrl: "companies",
	searchUrl: "search/companies",  // optional, if you have search endpoint
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
} = companyApi;