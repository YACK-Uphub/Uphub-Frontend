import { JobDateType, JobSearchPaginatedRequestParams } from "@/types/job";
import { createSlice } from "@reduxjs/toolkit";

const initialState: JobSearchPaginatedRequestParams = {
	pageNumber: 1,
	pageSize: 9,
	searchTerm: "",
	companyId: undefined,
	cityId: "",
	userJobStatus: undefined,
	sort: JobDateType.DateDesc,
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
		setUserJobStatus(state, action) {
			state.userJobStatus = action.payload;
			state.pageNumber = 1;
		},
		setSort(state, action) {
			state.sort = action.payload;
			state.pageNumber = 1;
		},
		setCityId(state, action) {
			state.cityId = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const {
	resetParams,
	setPageIndex,
	setPageSize,
	setSearchTerm,
	setCompanyId,
	setUserJobStatus,
	setSort,
	setCityId,
} = jobSlice.actions;
export default jobSlice.reducer;
