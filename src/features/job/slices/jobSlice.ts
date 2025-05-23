import { JobParams } from '@/services/jobsApi';
import { createSlice } from '@reduxjs/toolkit';

const initialState: JobParams = {
  pageIndex: 1,
  pageSize: 12,
  userId: undefined,
};

export const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    setPageIndex(state, action) {
      state.pageIndex = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
      state.pageIndex = 1;
    },
    resetParams() {
      return initialState;
    },
  },
});

export const { resetParams, setPageIndex, setPageSize, setUserId } =
  jobSlice.actions;
