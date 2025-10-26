import { useNavigate } from 'react-router';

import { Ticket } from '../model/types';

import { useCustomTranslation } from '@/shared';

interface TicketCardProps {
	ticket: Ticket;
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'open':
			return 'text-white bg-[#4D4B4A] border-2 border-white rounded-[10px]';
		case 'in_progress':
			return 'text-[#FFDA44] bg-[#453C1D] border-2 border-[#FFDA44] rounded-[10px]';
		case 'closed':
			return 'text-[#84DCC6] bg-[#34443F] border-2 border-[#84DCC6] rounded-[10px]';
		default:
			return 'text-gray-400 bg-gray-400/20 border-2 border-gray-400 rounded-[10px]';
	}
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
	const navigate = useNavigate();
	const {
		ticket_status_open,
		ticket_status_in_progress,
		ticket_status_closed
	} = useCustomTranslation('profile');

	const handleTicketClick = () => {
		navigate(`/profile/tickets/${ticket.id}`);
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case 'open':
				return ticket_status_open;
			case 'in_progress':
				return ticket_status_in_progress;
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
		<div
			className='bg-[var(--second-bg)] rounded-2xl p-4 mb-3 hover:bg-[var(--third-bg)] transition-colors cursor-pointer'
			onClick={handleTicketClick}
		>
			<div className='flex items-start gap-3'>
				<div className='text-2xl mt-1'>{ticket.icon}</div>

				<div className='flex-1 min-w-0'>
					<div className='flex items-center justify-between mb-2'>
						<h3 className='font-semibold text-white text-lg truncate'>
							{ticket.title}
						</h3>
						<span
							className={`px-2 py-1 text-xs font-medium ${getStatusColor(ticket.status)}`}
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
