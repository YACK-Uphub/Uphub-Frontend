import {configureStore} from "@reduxjs/toolkit";

// Create store instance per request for strong type safety
export function makeStore() {
	return configureStore({
		reducer: {}
	})
}

// Infer those type to get the state, store, dispatch per request
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']