import { SearchPaginatedRequestParams } from "@/types/baseModel";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SearchPaginatedRequestParams = {
	pageNumber: 1,
	pageSize: 9,
	searchTerm: "",
};

export const jobSlice = createSlice({
	name: "jobSlice",
	initialState,
	reducers: {
		setPageIndex(state, action) {
			state.pageNumber = action.payload;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload;
		},
		setSearchTerm(state, action) {
			state.searchTerm = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const { resetParams, setPageIndex, setPageSize, setSearchTerm } = jobSlice.actions;
