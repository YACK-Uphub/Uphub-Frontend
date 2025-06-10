import {City} from "@/types/city";
import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";

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
