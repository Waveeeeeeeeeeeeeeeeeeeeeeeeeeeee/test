import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { useMessageStore } from '@/entities/ticket/model/messageStore';
import { TicketMessage } from '@/entities/ticket/model/messageTypes';
import { useTicketStore } from '@/entities/ticket/model/store';
import { MessageBubble } from '@/entities/ticket/ui/MessageBubble';
import { useCustomTranslation } from '@/shared';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';

export const TicketDetail = () => {
  const { ticketId } = useParams<{ticketId: string;}>();
  const { tickets } = useTicketStore();
  const { getMessagesByTicketId, messages: allMessages } = useMessageStore();
  const {
    tickets: ticketsTitle,
    ticket_closed_empty_title,
    ticket_closed_empty_description,
    ticket_start_conversation,
    ticket_start_description
  } = useCustomTranslation('profile');

  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const ticket = tickets.find((t) => t.id === ticketId);

  useEffect(() => {
    if (ticketId) {
      const ticketMessages = getMessagesByTicketId(ticketId);
      setMessages(ticketMessages);
    }
  }, [ticketId, getMessagesByTicketId]);

  useEffect(() => {
    if (ticketId) {
      const ticketMessages = getMessagesByTicketId(ticketId);
      setMessages(ticketMessages);
    }
  }, [ticketId, getMessagesByTicketId, allMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!ticket) {
    return (
      <div className='h-screen flex flex-col'>
				<div className='pt-4 px-4'>
					<NotificationHeaderFactory title={ticketsTitle} IsBack={true} />
				</div>
				<div className='flex-1 flex items-center justify-center'>
					<div className='text-center'>
						<div className='text-6xl mb-4'>❌</div>
						<h3 className='text-xl font-semibold text-white mb-2'>
							Тикет не найден
						</h3>
						<p className='text-gray-400'>
							Запрашиваемый тикет не существует или был удален
						</p>
					</div>
				</div>
			</div>);

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Открыт';
      case 'in_progress':
        return 'В работе';
      case 'closed':
        return 'Закрыт';
      default:
        return status;
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-black'>
			<div className='pt-4 px-4 bg-black'>
				<NotificationHeaderFactory
          title={ticket?.title || 'Тикет'}
          IsBack={true}
          notification={false} />

			</div>

			<div className='flex-1 flex flex-col bg-black'>
				<div className='p-4 border-b border-gray-800'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
						<div className='flex justify-end sm:justify-start order-1 sm:order-2'>
							<div
                className={`px-3 py-2 text-xs font-medium ${getStatusColor(ticket?.status || 'open')} whitespace-nowrap`}
                style={{ borderRadius: '10px' }}>

								{getStatusText(ticket?.status || 'open')}
							</div>
						</div>
						<div className='flex-1 order-2 sm:order-1'>
							<div className='text-sm text-gray-400 pr-2'>
								{ticket?.description || 'Описание отсутствует'}
							</div>
						</div>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-black max-h-[calc(100vh-200px)]'>
					{messages.length === 0 ?
          <div className='flex flex-col items-center justify-center h-full text-center'>
							{ticket?.status === 'closed' ?
            <>
									<div className='text-4xl mb-4'>🔒</div>
									<h3 className='text-lg font-semibold text-white mb-2'>
										{ticket_closed_empty_title}
									</h3>
									<p className='text-gray-400'>
										{ticket_closed_empty_description}
									</p>
								</> :

            <>
									<div className='text-4xl mb-4'>💬</div>
									<h3 className='text-lg font-semibold text-white mb-2'>
										{ticket_start_conversation}
									</h3>
									<p className='text-gray-400'>{ticket_start_description}</p>
								</>
            }
						</div> :

          messages.map((message, index) =>
          <MessageBubble
            key={message.id}
            message={message}
            previousMessage={index > 0 ? messages[index - 1] : undefined} />

          )
          }
					<div ref={messagesEndRef} />
				</div>
			</div>
		</div>);

};