import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQueryWithErrorHandling} from "@/services/baseApi";
import {SendMessageRequestBody, SendMessageResponse} from "@/types/chat";

export const chatsApi = createApi({
	reducerPath: "chatApi",
	baseQuery: customFetchBaseQueryWithErrorHandling,
	tagTypes: ["chats"],

	// endpoints
	endpoints: (builder) => ({

		/**
		 * POST /agent/generate {question: string}
		 * return SendMessageResponse
		 */
		sendMessage: builder.mutation<SendMessageResponse, SendMessageRequestBody>({
			query: (bodyObject) => ({
				url: `/agent/generate`,
				method: "POST",
				body: {...bodyObject}
			}),
		}),
	}),
});

export const {
	useSendMessageMutation
} = chatsApi;
