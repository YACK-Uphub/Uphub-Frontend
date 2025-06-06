// features/student/slices/studentSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StudentSearchPaginatedRequestParams,} from "@/types/user";

const initialState: StudentSearchPaginatedRequestParams = {
  pageIndex: 1,
  pageSize: 8,
};

export const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers: {
    setPageIndex(state, action: PayloadAction<number>) {
      state.pageIndex = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const {
  setPageIndex,
  setPageSize,
  resetParams,
} = studentSlice.actions;

export default studentSlice.reducer;
