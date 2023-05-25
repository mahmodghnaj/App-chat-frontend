import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import {
  ChatType,
  LocalCurrentChatType,
  MessageType,
} from "@/store/types/chats";

interface State {
  currentChat: ChatType | null;
  localCurrentChat: LocalCurrentChatType | null;
  messages: MessageType[];
  totalMessages?: number;
  loadingGetMessages: boolean;
  chats: ChatType[];
  totalChats?: number;
}

const initialState: State = {
  currentChat: null,
  localCurrentChat: null,
  messages: [],
  totalMessages: undefined,
  loadingGetMessages: false,
  chats: [],
  totalChats: undefined,
};

export const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    setCurrentChat: (state, { payload }: PayloadAction<ChatType>) => {
      state.currentChat = payload;
    },
    setChats: (state, { payload }: PayloadAction<ChatType[]>) => {
      state.chats.push(...payload);
    },
    setTotalChats: (state, { payload }: PayloadAction<number | undefined>) => {
      state.totalChats = payload;
    },
    setMessages: (state, { payload }: PayloadAction<MessageType[]>) => {
      state.messages.push(...payload);
    },
    setTotalMessages: (
      state,
      { payload }: PayloadAction<number | undefined>
    ) => {
      state.totalMessages = payload;
    },
    resetChats: (state) => {
      state.chats = [];
    },
    resetMessages: (state) => {
      state.messages = [];
      state.totalMessages = undefined;
    },
    setLoadingGetMessages: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingGetMessages = payload;
    },
    addNewMessage: (state, { payload }: PayloadAction<MessageType>) => {
      if (state.currentChat?.id === payload.room) {
        state.messages.unshift(payload);
        if (state.totalMessages) {
          state.totalMessages += 1;
        }
      }
    },
    setLocalCurrentChat: (
      state,
      { payload }: PayloadAction<LocalCurrentChatType | null>
    ) => {
      state.localCurrentChat = payload;
    },
    addNewChat: (state, { payload }: PayloadAction<ChatType>) => {
      state.chats.unshift(payload);
    },
    setFirstChatItem(state) {
      const index = state.chats.findIndex(
        (item) => item.id === state.currentChat?.id
      );
      if (index !== -1 && state.currentChat) {
        state.chats.splice(index, 1);
        state.chats.unshift(state.currentChat);
      }
    },
  },
});

export const {
  setCurrentChat,
  setChats,
  resetChats,
  setTotalChats,
  setMessages,
  setTotalMessages,
  resetMessages,
  setLoadingGetMessages,
  addNewMessage,
  setLocalCurrentChat,
  addNewChat,
  setFirstChatItem,
} = chatsSlice.actions;

export const currentChat = (state: RootState) => state.Chats.currentChat;
export const chats = (state: RootState) => {
  const data = [...state.Chats.chats];
  return data.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt);
    const updatedAtB = new Date(b.updatedAt);
    return updatedAtB.getTime() - updatedAtA.getTime();
  });
};
export const totalChats = (state: RootState) => state.Chats.totalChats;
export const messages = (state: RootState) =>
  [...state.Chats.messages].reverse();
export const totalMessages = (state: RootState) => state.Chats.totalMessages;
export const loadingGetMessages = (state: RootState) =>
  state.Chats.loadingGetMessages;
export const localCurrentChat = (state: RootState) =>
  state.Chats.localCurrentChat;