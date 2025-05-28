import { CompanySearchPaginatedRequestParams } from "@/types/company";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CompanySearchPaginatedRequestParams = {
    pageNumber: 1,
    pageSize: 5,
    searchTerm: "",
};

export const companySlice = createSlice({
    name: "companySlice",
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
        setIsLinked(state, action) {
            state.isLinked = action.payload;
            state.pageNumber = 1;
        },
        resetParams() {
            return initialState;
        },
    },
});

export const { resetParams, setPageIndex, setPageSize, setSearchTerm, setIsLinked } = companySlice.actions;
export default companySlice.reducer;
