export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface Ticket {
	id: string;
	title: string;
	description: string;
	status: TicketStatus;
	icon: string;
	createdAt: string;
	updatedAt: string;
}

export interface TicketStore {
	tickets: Ticket[];
	setTickets: (tickets: Ticket[]) => void;
	addTicket: (ticket: Ticket) => void;
	updateTicketStatus: (id: string, status: TicketStatus) => void;
}
