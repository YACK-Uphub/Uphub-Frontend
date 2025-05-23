import {BaseQueryApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {notFound} from "next/navigation";

const customFetchBaseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:6001',
	credentials: 'include',
});

export const customFetchBaseQueryWithErrorHandling = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object) => {

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
}