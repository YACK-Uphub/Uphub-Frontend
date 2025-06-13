import {createSlice} from "@reduxjs/toolkit";
import {InternshipPaginatedRequestParams, InternshipStatus} from "@/types/internship";

const initialState: InternshipPaginatedRequestParams = {
	pageNumber: 1,
	pageSize: 5,
	searchTerm: "",
	sort: undefined,
	status: InternshipStatus.Completed
};

export const internshipSlice = createSlice({
	name: "internshipSlice",
	initialState,
	reducers: {
		setPageIndex(state, action) {
			state.pageNumber = action.payload;
		},
		setPageSize(state, action) {
			state.pageSize = action.payload;
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

export const {resetParams, setPageIndex, setPageSize, setSort} = internshipSlice.actions;

export default internshipSlice.reducer;
