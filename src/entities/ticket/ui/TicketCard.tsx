import { Ticket } from '../model/types';

import { useCustomTranslation } from '@/shared';

interface TicketCardProps {
	ticket: Ticket;
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'open':
			return 'text-green-400 bg-green-400/20';
		case 'in_progress':
			return 'text-yellow-400 bg-yellow-400/20';
		case 'resolved':
			return 'text-blue-400 bg-blue-400/20';
		case 'closed':
			return 'text-red-400 bg-red-400/20';
		default:
			return 'text-gray-400 bg-gray-400/20';
	}
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
	const {
		ticket_status_open,
		ticket_status_in_progress,
		ticket_status_resolved,
		ticket_status_closed
	} = useCustomTranslation('profile');

	const getStatusText = (status: string) => {
		switch (status) {
			case 'open':
				return ticket_status_open;
			case 'in_progress':
				return ticket_status_in_progress;
			case 'resolved':
				return ticket_status_resolved;
			case 'closed':
				return ticket_status_closed;
			default:
				return status;
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	return (
		<div className='bg-[var(--second-bg)] rounded-2xl p-4 mb-3 hover:bg-[var(--third-bg)] transition-colors cursor-pointer'>
			<div className='flex items-start gap-3'>
				<div className='text-2xl mt-1'>{ticket.icon}</div>

				<div className='flex-1 min-w-0'>
					<div className='flex items-center justify-between mb-2'>
						<h3 className='font-semibold text-white text-lg truncate'>
							{ticket.title}
						</h3>
						<span
							className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
						>
							{getStatusText(ticket.status)}
						</span>
					</div>

					<p className='text-gray-300 text-sm mb-3 line-clamp-2'>
						{ticket.description}
					</p>

					<div className='flex items-center justify-between text-xs text-gray-400'>
						<span>ID: {ticket.id}</span>
						<span>{formatDate(ticket.updatedAt)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
