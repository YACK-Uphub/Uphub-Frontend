import {configureStore} from "@reduxjs/toolkit";
import {companyApi} from "@/services/companiesApi";

// Create store instance per request for strong type safety
export function makeStore() {
	return configureStore({
			reducer: {
				[companyApi.reducerPath]: companyApi.reducer,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(companyApi.middleware)
		}
	)
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']