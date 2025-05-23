import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBaseQueryWithErrorHandling } from './baseApi';
import { PaginatedResponse } from '@/types/baseModel';
import { Job } from '@/types/job';
export interface JobParams {
  userId?: string | number;
  pageIndex?: number;
  pageSize?: number;
}
export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: customFetchBaseQueryWithErrorHandling,
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getJobs: builder.query<PaginatedResponse<Job>, JobParams>({
      query: (jobParams) => ({
        url: `/search/jobs`,
        method: 'GET',
        params: {
          ...jobParams,
          pageIndex: jobParams.pageIndex,
          pageSize: jobParams.pageSize,
        },
      }),
      providesTags: ['Jobs'],
    }),
  }),
});

export const { useGetJobsQuery } = jobApi;
