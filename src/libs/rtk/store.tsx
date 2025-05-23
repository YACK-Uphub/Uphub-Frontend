import {configureStore} from "@reduxjs/toolkit";
import {applicationApi} from "@/services/application/applicationsApi";

// Create store instance per request for strong type safety
export function makeStore() {
	return configureStore({
			reducer: {
				[applicationApi.reducerPath]: applicationApi.reducer,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(applicationApi.middleware),
		}
	)
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']