import {createSlice} from "@reduxjs/toolkit";
import {InternshipCreateRequestParams} from "@/types/internship";

const initialState: InternshipCreateRequestParams = {
	jobId: -1,
	internshipProgramId: -1,
	userId: -1,
};

export const createInternshipSlice = createSlice({
	name: "internshipSlice",
	initialState,
	reducers: {
		setJobId(state, action) {
			state.jobId = action.payload;
		},
		setInternshipProgramId(state, action) {
			state.internshipProgramId = action.payload;
		},
		setUserId(state, action) {
			state.userId = action.payload;
		},
		resetParams() {
			return initialState;
		},
	},
});

export const {setJobId, setInternshipProgramId, setUserId, resetParams} = createInternshipSlice.actions;

export default createInternshipSlice.reducer;
