import {Entity} from "@/types/baseModel";

/**
 * Store in within the slice
 */
export type ChatMessage = Entity<{
	sender: ChatMessageSender,
	text: string,
	date: string,
}>

export enum ChatMessageSender {
	User = "User",
	Bot = "Bot",
}

/**
 * Response shape from POST /chatbox
 */
export interface SendMessageResponse {
	answer: string,
	dateReply: string
}

/**
 * Request Body Json Object
 */
export interface SendMessageRequestBody {
	question: string;
}

/**
 * Chat bot state
 */
export interface ChatState {
	open: boolean;
	messages: ChatMessage[];
}
