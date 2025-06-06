import {InternshipProgramPaginatedRequestParams} from "@/types/internshipProgram";
import {createSlice} from "@reduxjs/toolkit";

const initialState: InternshipProgramPaginatedRequestParams = {
	pageNumber: 1,
	pageSize: 5,
	searchTerm: "",
	sort: undefined,
};

export const internshipProgramSlice = createSlice({
	name: "internshipProgramSlice",
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
		setSort(state, action) {
			state.sort = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const { resetParams, setPageIndex, setPageSize, setSearchTerm, setSort } = internshipProgramSlice.actions;
export default internshipProgramSlice.reducer;
