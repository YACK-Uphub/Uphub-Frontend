import {ChatMessage, ChatMessageSender, ChatState} from "@/types/chat";
import {storage} from "@/utils/localStorageHelpers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';


/**
 * Save the list of messages temporarily under the local storage
 */
const saveMessages = (msgs: ChatMessage[], quantity: number) => {
  const trimmed = msgs.slice(-quantity);
  storage.set<ChatMessage[]>(process.env.CHAT_MESSAGE_KEY, trimmed);
}

/**
 * Load the messages from the local storage
 * @param quantity
 */
const loadMessages = (quantity: number): ChatMessage[] => {
  const stored = storage.get<ChatMessage[]>(process.env.CHAT_MESSAGE_KEY);
  return stored ? stored.slice(-quantity) : [];
}

const initialState: ChatState = {
  open: false,
  messages: loadMessages(10)
}
export const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {

    // toggle open widget
    toggleOpen(state) {
      state.open = !state.open
    },

    // clear all messages
    clearChat(state) {
      state.messages = [];
      storage.remove(process.env.CHAT_MESSAGE_KEY);
    },

    /** Append a user message */
    addUserMessage(
        state,
        action: PayloadAction<{ text: string; date: string }>
    ) {
      const msg: ChatMessage = {
        id: uuidv4(),
        sender: ChatMessageSender.User,
        text: action.payload.text,
        date: action.payload.date
      }

      // push to the list and get only top 10
      state.messages.push(msg)
      saveMessages(state.messages, 10)
    },

    /** Append a bot message */
    addBotMessage(
        state,
        action: PayloadAction<{ text: string; date: string }>
    ) {
      const msg: ChatMessage = {
        id: uuidv4(),
        sender: ChatMessageSender.Bot,
        text: action.payload.text,
        date: action.payload.date
      }

      // push to list and get only top 20
      state.messages.push(msg)
      saveMessages(state.messages, 20)
    }
  }
})

export const {
  toggleOpen,
  clearChat,
  addUserMessage,
  addBotMessage,
} = chatSlice.actions;
