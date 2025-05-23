import {createApi} from "@reduxjs/toolkit/query/react";
import {SearchPaginatedRequestParams, SearchPaginatedResponse} from "@/types/baseModel";
import {customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";
import {Company} from "@/types/company";

export const companyApi = createApi({
	reducerPath: 'companyApi',

	baseQuery: customFetchBaseQueryWithErrorHandling,

	endpoints: (builder) => ({

		// GET: /companies/11
		getCompanyById: builder.query<Company, number | string>({
			query: (id) => ({
				url: `companies/${id}`,
				method: 'GET',
			})
		}),

		// GET: /search/companies?sort=nameAsc&pageNumber=1&pageSize=3&searchTerm=Công ty TNHH
		searchCompanies: builder.query<SearchPaginatedResponse<Company>, SearchPaginatedRequestParams>({
			query: (params) => ({
				url: "search/companies",
				method: "GET",
				params: {
					...params,
					pageNumber: params.pageNumber ?? 1,
					pageSize: params.pageSize ?? 5,
				}
			})
		}),
	})
})

export const {
	useLazyGetCompanyByIdQuery,
	useGetCompanyByIdQuery,
	useLazySearchCompaniesQuery,
	useSearchCompaniesQuery,
} = companyApi