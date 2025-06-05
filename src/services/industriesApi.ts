// services/industriesApi.ts
import {createCrudApi} from "@/services/baseApi";
import {Industry, IndustrySearchPaginatedRequestParams} from "@/types/industry";

export const industriesApi = createCrudApi<Industry, IndustrySearchPaginatedRequestParams>({
	reducerPath: "industriesApi",
	tagType: "Industry",
	baseUrl: "industries",
	searchUrl: "search/industries",
});

export const {
	// === Queries ===
	useGetByIdQuery: useGetIndustryByIdQuery,
	useGetAllQuery: useGetAllIndustriesQuery,
	useSearchQuery: useSearchIndustriesQuery,        // only valid if you provided searchUrl above

	// === Mutations ===
	useCreateMutation: useCreateIndustryMutation,
	useUpdateMutation: useUpdateIndustryMutation,
	useDeleteMutation: useDeleteIndustryMutation,

	// === Lazy Hooks (if desired) ===
	useLazyGetByIdQuery: useLazyGetIndustryByIdQuery,
	useLazySearchQuery: useLazySearchIndustriesQuery, // only valid if searchUrl is set
} = industriesApi;
