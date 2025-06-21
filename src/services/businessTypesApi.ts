// services/industriesApi.ts
import { createCrudApi } from "@/services/baseApi";
import { SearchPaginatedRequestParams } from "@/types/baseModel";
import { BusinessType } from "@/types/businessType";

export const businessTypesApi = createCrudApi<BusinessType, SearchPaginatedRequestParams>({
	reducerPath: "businessTypesApi",
	tagType: "businessTypes",
	baseUrl: "business-types",
	searchUrl: "search/business-types",
});

export const {
	// === Queries ===
	useGetAllQuery: useGetAllBusinessTypesQuery,
} = businessTypesApi;
