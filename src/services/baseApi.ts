import {BaseQueryApi, BaseQueryFn, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {notFound} from "next/navigation";
import {BaseEntity, PaginatedResponse, SearchPaginatedRequestParams, SearchPaginatedResponse,} from "@/types/baseModel";
import {createApi} from "@reduxjs/toolkit/query/react";

// =============================
// === Custom Base Query
// =============================

const customFetchBaseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
	credentials: "include",
});

export const customFetchBaseQueryWithErrorHandling = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object
) => {
	const result = await customFetchBaseQuery(args, api, extraOptions);

	if (result.error) {
		console.error(result.error);

		const status = result.error.status;

		if (status === 404) {
			notFound(); // show 404 page only if resource is not found
		}

		if (status === 502) {
			throw new Error("Bad Gateway: Backend service is unavailable");
		}
	}

	return result;
};

// =============================
// === Endpoints Template
// =============================

export type CrudApiOptions = {
	reducerPath: string; // Unique name for RTK Query slice
	tagType: string; // Used for cache tags (e.g., 'Company')
	baseUrl: string; // Main API endpoint (e.g., 'companies')
	searchUrl?: string; // Optional endpoint for paginated search
	baseQuery?: BaseQueryFn; // Optional: your custom fetch logic, override the existing custom api
};

export function createCrudApi<T extends BaseEntity, P extends SearchPaginatedRequestParams>({
	reducerPath,
	tagType,
	baseUrl,
	searchUrl,
	baseQuery = customFetchBaseQueryWithErrorHandling,
}: CrudApiOptions) {
	return createApi({
		reducerPath,

		baseQuery,

		tagTypes: [tagType],

		endpoints: (builder) => ({
			// GET: companies/1
			getById: builder.query<T, number | string>({
				query: (id) => ({
					url: `${baseUrl}/${id}`,
					method: "GET",
				}),
				providesTags: (result, error, id) => [{ type: tagType, id }],
			}),

			// GET: companies
			getAll: builder.query<PaginatedResponse<T>, P>({
				query: (params) => ({
					url: baseUrl,
					method: "GET",
					params: {
						pageNumber: params.pageNumber ?? 1,
						pageSize: params.pageSize ?? 10,
						...params,
					},
				}),
				providesTags: [tagType],
			}),

			// GET: search/companies?sort=nameAsc&pageNumber=1&pageSize=3&searchTerm=Công ty TNHH
			search: searchUrl
				? builder.query<SearchPaginatedResponse<T>, P>({
					query: (params) => ({
						url: searchUrl,
						method: "GET",
						params: {
							pageNumber: params.pageNumber ?? 1,
							pageSize: params.pageSize ?? 10,
							...params,
						},
					}),
					providesTags: [tagType],
				})
				: undefined,

			// CREATE: application/2
			create: builder.mutation<T, Partial<T>>({
				query: (body) => ({
					url: baseUrl,
					method: "POST",
					body,
				}),
				invalidatesTags: [tagType],
			}),

			// PUT: application/2
			update: builder.mutation<T, { id: string | number; body: Partial<T> }>({
				query: ({ id, body }) => ({
					url: `${baseUrl}/${id}`,
					method: "PUT",
					body,
				}),
				invalidatesTags: (result, error, {id}) => [{type: tagType, id}, tagType],
			}),

			// DELETE: application/2
			delete: builder.mutation<{ success: boolean }, number | string>({
				query: (id) => ({
					url: `${baseUrl}/${id}`,
					method: "DELETE",
				}),
				invalidatesTags: (result, error, id) => [{ type: tagType, id }, tagType],
			}),
		}),
	});
}
