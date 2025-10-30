export type MessageSender = 'user' | 'support';

export interface TicketMessage {
  id: string;
  ticketId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

export interface TicketDetail {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
  messages: TicketMessage[];
}

export interface MessageStore {
  messages: {[ticketId: string]: TicketMessage[];};
  addMessage: (ticketId: string, message: TicketMessage) => void;
  getMessagesByTicketId: (ticketId: string) => TicketMessage[];
  markMessageAsRead: (messageId: string) => void;
}