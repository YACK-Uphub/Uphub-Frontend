import {createCrudApi} from "@/services/baseApi";
import {Plan, PlanSearchPaginatedRequestParams} from "@/types/plan"; // Assuming you move Plan to its own module

export const plansApi = createCrudApi<Plan, PlanSearchPaginatedRequestParams>({
  reducerPath: "plansApi",
  tagType: "plans",
  baseUrl: "plans",
  searchUrl: "search/plans", // Adjust this if your backend uses a different search path
});

export const {
  useGetByIdQuery: useGetPlanByIdQuery,
  useGetAllQuery: useGetAllPlansQuery,
  useSearchQuery: useSearchPlansQuery,
  useCreateMutation: useCreatePlanMutation,
  useUpdateMutation: useUpdatePlanMutation,
  useDeleteMutation: useDeletePlanMutation,

  // Lazy queries
  useLazyGetByIdQuery: useLazyGetPlanByIdQuery,
  useLazySearchQuery: useLazySearchPlansQuery,
} = plansApi;

