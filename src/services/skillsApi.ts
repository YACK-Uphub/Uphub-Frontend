// services/skillsApi.ts
import {createCrudApi} from "@/services/baseApi";
import {Skill, SkillSearchPaginatedRequestParams} from "@/types/skill";

export const skillsApi = createCrudApi<Skill, SkillSearchPaginatedRequestParams>({
	reducerPath: "skillsApi",
	tagType: "Skill",
	baseUrl: "skills",
	searchUrl: "search/skills",
});

export const {
	useGetByIdQuery: useGetSkillByIdQuery,
	useGetAllQuery: useGetAllSkillsQuery,
	useCreateMutation: useCreateSkillMutation,
	useUpdateMutation: useUpdateSkillMutation,
	useDeleteMutation: useDeleteSkillMutation,
	useLazyGetByIdQuery: useLazyGetSkillByIdQuery,
} = skillsApi;
