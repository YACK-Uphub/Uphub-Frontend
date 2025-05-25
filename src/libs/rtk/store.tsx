import {configureStore} from "@reduxjs/toolkit";
import {applicationApi} from "@/services/applicationsApi";
import {companyApi} from "@/services/companiesApi";
import {jobApi} from "@/services/jobsApi";
import { jobSlice } from '@/features/job/slices/jobSlice';
import { companySlice } from '@/features/company/slices/companySlice';

// Create store instance per request for strong type safety
export function makeStore() {
	return configureStore({
			reducer: {
				[applicationApi.reducerPath]: applicationApi.reducer,
				[companyApi.reducerPath]: companyApi.reducer,
				[jobApi.reducerPath]: jobApi.reducer,

				job: jobSlice.reducer,
				company: companySlice.reducer
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware()
				.concat(applicationApi.middleware)
				.concat(companyApi.middleware)
				.concat(jobApi.middleware)
		}
	)
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']