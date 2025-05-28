import { ApplicationNameType, ApplicationSearchPaginatedRequestParams } from "@/types/application";
import { JobDateType, JobSearchPaginatedRequestParams } from "@/types/job";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ApplicationSearchPaginatedRequestParams = {
	pageNumber: 1,
	pageSize: 6,
	searchTerm: "",
	sort: ApplicationNameType.NameAsc,
};

export const applicationSlice = createSlice({
	name: "applicationSlice",
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
		setUserId(state, action) {
			state.userId = action.payload;
			state.pageNumber = 1;
		},
		setJobId(state, action) {
			state.jobId = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const { resetParams, setPageIndex, setPageSize, setSearchTerm, setUserId, setJobId } = applicationSlice.actions;
export default applicationSlice.reducer;
