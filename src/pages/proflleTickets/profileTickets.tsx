import { useTicketStore } from '@/entities/ticket/model/store';
import { TicketCard } from '@/entities/ticket/ui/TicketCard';
import { useCustomTranslation } from '@/shared';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';

export const ProfileTickets = () => {
	const { tickets } = useTicketStore();
	const {
		tickets: ticketsTitle,
		tickets_empty_title,
		tickets_empty_description,
		tickets_count,
		tickets_subtitle
	} = useCustomTranslation('profile');

	return (
		<div className='h-screen flex flex-col'>
			<div className='pt-4 px-4'>
				<NotificationHeaderFactory title={ticketsTitle} IsBack={true} />
			</div>

			<div className='flex-1 px-4 pt-6 pb-8 overflow-y-auto'>
				{tickets.length === 0 ? (
					<div className='flex flex-col items-center justify-center h-full text-center'>
						<div className='text-6xl mb-4'>🎫</div>
						<h3 className='text-xl font-semibold text-white mb-2'>
							{tickets_empty_title}
						</h3>
						<p className='text-gray-400 mb-6'>{tickets_empty_description}</p>
					</div>
				) : (
					<div className='mb-10'>
						<div className='mb-4'>
							<h2 className='text-lg font-semibold text-white mb-1'>
								{tickets_count} ({tickets.length})
							</h2>
							<p className='text-sm text-gray-400'>{tickets_subtitle}</p>
						</div>

						<div className='space-y-3 pb-4'>
							{tickets.map(ticket => (
								<TicketCard key={ticket.id} ticket={ticket} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
