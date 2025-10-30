import { create } from 'zustand';

import { MessageStore, TicketMessage } from './messageTypes';
import { mockMessages } from './mockMessages';

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: mockMessages,

  addMessage: (ticketId, message) =>
  set((state) => ({
    messages: {
      ...state.messages,
      [ticketId]: [...(state.messages[ticketId] || []), message]
    }
  })),

  getMessagesByTicketId: (ticketId) => {
    const state = get();
    return state.messages[ticketId] || [];
  },

  markMessageAsRead: (messageId) =>
  set((state) => {
    const newMessages = { ...state.messages };
    Object.keys(newMessages).forEach((ticketId) => {
      newMessages[ticketId] = newMessages[ticketId].map((msg) =>
      msg.id === messageId ? { ...msg, isRead: true } : msg
      );
    });
    return { messages: newMessages };
  })
}));