import { useEffect } from 'react';

import { TicketMessage } from '../model/messageTypes';

import { useUserStore } from '@/entities/user/model/store';
import DoneIcon from '@/shared/assets/icons/done_all.svg?react';
import DoneIconWhite from '@/shared/assets/icons/done_all_white.svg?react';
import AceSupportIcon from '@/shared/assets/images/ace-support.png';

interface MessageBubbleProps {
  message: TicketMessage;
  previousMessage?: TicketMessage;
}

export const MessageBubble = ({
  message,
  previousMessage
}: MessageBubbleProps) => {
  const { user } = useUserStore();

  useEffect(() => {}, [user?.first_name, user?.last_name, user?.photo_url]);

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `${dateStr} ${timeStr}`;
  };

  const isUser = message.sender === 'user';
  const showHeader =
  !previousMessage || previousMessage.sender !== message.sender;

  return (
    <div className={`flex ${isUser ? 'justify-start' : 'justify-end'} mb-4`}>
			<div className='max-w-[80%]'>
				{isUser && showHeader &&
        <div className='flex items-center gap-2 mb-2'>
						<div className='w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center'>
							{user?.photo_url ?
            <img
              src={user.photo_url}
              alt='User Avatar'
              className='w-6 h-6 rounded-full object-cover' /> :


            <span className='text-white text-xs'>
									{(user?.first_name || 'Oleg')?.[0]}
									{(user?.last_name || 'Starovoit')?.[0]}
								</span>
            }
						</div>
						<span className='text-white text-sm'>
							{user?.first_name || 'Oleg'} {user?.last_name || 'Starovoit'}
						</span>
					</div>
        }
				{!isUser && showHeader &&
        <div className='flex items-center gap-2 mb-2 justify-end'>
						<span className='text-white text-sm'>Ace Support</span>
						<img src={AceSupportIcon} alt='Ace Support' className='w-4 h-4' />
					</div>
        }
				<div
          className={`px-4 py-3 rounded-2xl ${
          isUser ? 'bg-[#6C5DD3] text-white' : 'bg-[#161413] text-white'}`
          }>

					<p className='text-sm leading-relaxed break-words whitespace-pre-wrap'>
						{message.content}
					</p>
					{message.attachments && message.attachments.length > 0 &&
          <div className='flex gap-2 mt-3 flex-wrap'>
							{message.attachments.map((attachment, index) =>
            <img
              key={index}
              src={attachment}
              alt={`Attachment ${index + 1}`}
              className='w-20 h-20 object-cover rounded-lg' />

            )}
						</div>
          }
					<div className='flex items-center justify-between mt-2'>
						<span className='text-xs text-gray-400'>
							{formatDateTime(message.timestamp)}
						</span>
						{isUser ?
            <DoneIconWhite className='w-4 h-4' /> :

            <DoneIcon className='w-4 h-4' />
            }
					</div>
				</div>
			</div>
		</div>);

};