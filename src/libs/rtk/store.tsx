import { companySlice } from '@/features/company/slices/companySlice';
import { jobSlice } from '@/features/job/slices/jobSlice';
import { applicationsApi } from "@/services/applicationsApi";
import { companiesApi } from "@/services/companiesApi";
import { jobsApi } from "@/services/jobsApi";
import {configureStore, Middleware} from "@reduxjs/toolkit";

// Create store instance per request for strong type safety
export function makeStore() {
	return configureStore({
			reducer: {
				[companiesApi.reducerPath]: companiesApi.reducer,
				[applicationsApi.reducerPath]: applicationsApi.reducer,
				[jobsApi.reducerPath]: jobsApi.reducer,

				jobParams: jobSlice.reducer,
				companyParams: companySlice.reducer
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware()
				.concat(companiesApi.middleware as Middleware)
				.concat(applicationsApi.middleware as Middleware)
				.concat(jobsApi.middleware as Middleware)
		}
	)
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']