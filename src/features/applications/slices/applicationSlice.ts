import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ApplicationNameType, ApplicationSearchParams} from "@/types/application";

const initialState: ApplicationSearchParams = {
	pageNumber: 1,
	pageSize: 6,
	searchTerm: "",
	sort: null
};

export const applicationSlice = createSlice({
	name: "applications",
	initialState,
	reducers: {
		setPageIndex(state, action: PayloadAction<number>) {
			state.pageNumber = action.payload;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload;
		},
		setSearchTerm(state, action: PayloadAction<string>) {
			state.searchTerm = action.payload;
			state.pageNumber = 1;
		},
		setSort(state, action: PayloadAction<ApplicationNameType>) {
			state.sort = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const {resetParams, setPageSize, setPageIndex, setSort, setSearchTerm} = applicationSlice.actions;
export default applicationSlice.reducer;