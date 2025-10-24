import { create } from 'zustand';

import { mockTickets } from './mockData';
import { TicketStore } from './types';

export const useTicketStore = create<TicketStore>(set => ({
	tickets: mockTickets,

	setTickets: tickets => set({ tickets }),

	addTicket: ticket =>
		set(state => ({
			tickets: [ticket, ...state.tickets]
		})),

	updateTicketStatus: (id, status) =>
		set(state => ({
			tickets: state.tickets.map(ticket =>
				ticket.id === id
					? { ...ticket, status, updatedAt: new Date().toISOString() }
					: ticket
			)
		}))
}));
