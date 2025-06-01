import React from "react";
import { createCrudApi } from "./baseApi";
import { City } from "@/types/city";
import { SearchPaginatedRequestParams } from "@/types/baseModel";

export const citiesApi = createCrudApi<City, SearchPaginatedRequestParams>({
	reducerPath: "citiesApi",
	tagType: "cities",
	baseUrl: "cities",
	searchUrl: "search/cities",
});

export const { useGetAllQuery: useGetAllCitiesQuery } = citiesApi;
