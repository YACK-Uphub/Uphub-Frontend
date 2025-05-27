import { SearchPaginatedRequestParams } from "@/types/baseModel";
import { SearchJobParams } from "@/types/job";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SearchJobParams = {
	pageNumber: 1,
	pageSize: 9,
	searchTerm: "",
	companyId: undefined,
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
		setCompanyId(state, action) {
			state.companyId = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const { resetParams, setPageIndex, setPageSize, setSearchTerm, setCompanyId } = jobSlice.actions;
export default jobSlice.reducer;
