import {BaseQueryApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {toast} from "react-toastify";

const customFetchBaseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:6001',
	credentials: 'include',
});

type ErrorResponse = | string | { title: string } | { errors: string[] };

export const customFetchBaseQueryWithErrorHandling = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object) => {

	const result = await customFetchBaseQuery(args, api, extraOptions);

	// Print error if happens
	if (result.error) {
		console.error(result.error)

		// if parsing not available, get result from original status, or from status
		const originalStatus
			= result.error.status === 'PARSING_ERROR' && result.error.originalStatus
			? result.error.originalStatus
			: result.error.status;

		const responseData = result.error.data as ErrorResponse;

		switch (originalStatus) {
			case 400:
				if (typeof responseData === 'string') toast.error(responseData);
				else if ('errors' in responseData) {
					throw Object.values(responseData.errors).flat().join(', ')
				} else toast.error(responseData.title);
				break;
			case 401:
				if (typeof responseData === 'object' && 'title' in responseData)
					toast.error(responseData.title);
				break;
			case 403:
				if (typeof responseData === 'object')
					toast.error('403 Forbidden');
				break;
			case 404:
				if (typeof responseData === 'object' && 'title' in responseData)
					window.location.href = "/not-found";
				break;
			case 500:
				if (typeof responseData === 'object')
					window.location.href = "/server-error";
				break;
			default:
				break;
		}
	}

	return result;
}