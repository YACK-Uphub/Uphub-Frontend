import {BaseQueryApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query";

const customFetchBaseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:6001',
	credentials: 'include',
});

export const customFetchBaseQueryWithErrorHandling = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object) => {

	const result = await customFetchBaseQuery(args, api, extraOptions);

	// Print error if happens
	if (result.error) {
		console.error(result.error)
	}


	return result;
}