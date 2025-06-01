import React from "react";
import { createCrudApi, customFetchBaseQueryWithErrorHandling } from "./baseApi";
import { City } from "@/types/city";
import { SearchPaginatedRequestParams } from "@/types/baseModel";
import { createApi } from "@reduxjs/toolkit/query/react";

export const citiesApi = createApi({
	reducerPath: "cityApi",
	baseQuery: customFetchBaseQueryWithErrorHandling,
	tagTypes: ["cities"],
	endpoints: (builder) => ({
		getAllCities: builder.query<City[], void>({
			query: () => ({
				url: `/cities`,
			}),
		}),
	}),
});

export const { useGetAllCitiesQuery } = citiesApi;
