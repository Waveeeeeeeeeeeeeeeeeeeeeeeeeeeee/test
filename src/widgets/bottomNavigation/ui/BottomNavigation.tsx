import { Paperclip, User } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import styles from './BottomNavigation.module.css';
import { useMessageStore } from '@/entities/ticket/model/messageStore';
import { useTicketStore } from '@/entities/ticket/model/store';
import { useUserStore } from '@/entities/user/model/store';
import { useCustomTranslation } from '@/shared';
import FriendsIcon from '@/shared/assets/icons/Friends.svg?react';
import HomeIcon from '@/shared/assets/icons/Home.svg?react';
import BackIcon from '@/shared/assets/icons/back.svg?react';

export const BottomNavigation = () => {
	const { label1, label3, label4 } = useCustomTranslation('bottomBar');
	const { ticket_closed_message } = useCustomTranslation('profile');
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useUserStore();
	const { addMessage } = useMessageStore();
	const { tickets } = useTicketStore();
	const [message, setMessage] = useState('');
	const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

	const isProfileInfoRealLife = location.pathname === '/profile/info/realLife';
	const isProfileInfoOnline = location.pathname === '/profile/info/online';
	const isProfileInfoPage = isProfileInfoRealLife || isProfileInfoOnline;

	const isTicketDetailPage =
		location.pathname.startsWith('/profile/tickets/') &&
		location.pathname !== '/profile/tickets';

	const ticketId = isTicketDetailPage
		? location.pathname.split('/').pop()
		: null;
	const currentTicket = ticketId ? tickets.find(t => t.id === ticketId) : null;
	const isTicketClosed = currentTicket?.status === 'closed';

	const handleSave = () => {
		navigate('/profile');
	};

	const handleCancel = () => {
		navigate('/profile');
	};

	const handleSendMessage = () => {
		if (!message.trim() || !isTicketDetailPage || !ticketId) return;

		const attachmentUrls = attachedFiles.map(file => URL.createObjectURL(file));

		const newMessage = {
			id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			ticketId,
			sender: 'user' as const,
			content: message.trim(),
			timestamp: new Date().toISOString(),
			isRead: false,
			attachments: attachmentUrls
		};

		addMessage(ticketId, newMessage);
		setMessage('');
		setAttachedFiles([]);
	};

	if (isProfileInfoPage) {
		return (
			<nav className='fixed z-[100] bottom-0 p-4 w-full flex gap-4 bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
				<button
					onClick={handleCancel}
					className='flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold'
				>
					Отменить изменения
				</button>
				<button
					onClick={handleSave}
					className='flex-1 bg-[#6B5CD1] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2'
				>
					Сохранить
					<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
						<path
							d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'
							fill='white'
						/>
					</svg>
				</button>
			</nav>
		);
	}

	if (isTicketDetailPage) {
		if (isTicketClosed) {
			return (
				<nav className='fixed z-[100] bottom-0 p-4 w-full bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
					<div className='flex items-center justify-center h-12'>
						<span className='text-gray-400 text-sm'>
							{ticket_closed_message}
						</span>
					</div>
				</nav>
			);
		}

		return (
			<nav className='fixed z-[100] bottom-0 p-4 w-full flex gap-4 bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
				<button
					type='button'
					className='text-gray-400 hover:text-white transition-colors flex-shrink-0'
					onClick={() => {
						const input = document.createElement('input');
						input.type = 'file';
						input.accept = 'image/*';
						input.multiple = true;
						input.onchange = e => {
							const files = (e.target as HTMLInputElement).files;
							if (files && files.length > 0) {
								const newFiles = Array.from(files);
								setAttachedFiles(prev => [...prev, ...newFiles]);
							}
						};
						input.click();
					}}
				>
					<Paperclip size={20} />
				</button>
				<div className='flex-1 flex flex-col'>
					{attachedFiles.length > 0 && (
						<div className='flex gap-2 mb-2 flex-wrap'>
							{attachedFiles.map((file, index) => (
								<div key={index} className='relative'>
									<img
										src={URL.createObjectURL(file)}
										alt={`Attachment ${index + 1}`}
										className='w-12 h-12 object-cover rounded'
									/>
									<button
										onClick={() => {
											setAttachedFiles(prev =>
												prev.filter((_, i) => i !== index)
											);
										}}
										className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'
									>
										×
									</button>
								</div>
							))}
						</div>
					)}
					<textarea
						value={message}
						onChange={e => {
							if (e.target.value.length <= 200) {
								setMessage(e.target.value);
							}
						}}
						placeholder='Введите сообщение'
						className='w-full bg-transparent text-white border-none outline-none placeholder-gray-400 resize-none overflow-hidden'
						style={{
							height: 'auto',
							minHeight: '20px',
							maxHeight: '100px',
							lineHeight: '20px',
							maxWidth: '80%'
						}}
						onInput={e => {
							const target = e.target as HTMLTextAreaElement;
							target.style.height = 'auto';
							target.style.height = Math.min(target.scrollHeight, 100) + 'px';
						}}
						onKeyPress={e =>
							e.key === 'Enter' && !e.shiftKey && handleSendMessage()
						}
						maxLength={200}
					/>
					<div className='text-xs text-gray-400 mt-1'>{message.length}/200</div>
				</div>
				<button
					onClick={handleSendMessage}
					disabled={message.length < 30}
					className='bg-[#6C5DD3] hover:bg-[#5A4BC2] disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors flex-shrink-0 h-12 w-12 flex items-center justify-center'
				>
					<BackIcon
						className='w-4 h-4 rotate-180'
						style={{
							fill: message.length >= 30 ? 'white' : '#9CA3AF',
							color: message.length >= 30 ? 'white' : '#9CA3AF',
							filter:
								message.length >= 30
									? 'brightness(0) invert(1)'
									: 'brightness(0) invert(0.6)'
						}}
					/>
				</button>
			</nav>
		);
	}

	const navigationItems = [
		{
			label: label1,
			path: '/home',
			icon: HomeIcon
		},
		{
			label: label3,
			path: '/friends',
			icon: FriendsIcon
		},
		{
			label: label4,
			path: '/profile',
			isProfile: true,
			icon: User
		}
	];

	return (
		<nav className='fixed z-[100] bottom-0 p-4 w-full flex justify-between items-center bg-[var(--second-bg)] rounded-t-[16px] rounded-b-[29px]'>
			{navigationItems.map(item => {
				const isActive =
					item.path === '/'
						? location.pathname === '/' ||
							location.pathname.startsWith('/search')
						: location.pathname.startsWith(item.path);
				return (
					<button
						key={item.path}
						onClick={() => navigate(item.path)}
						className='group flex flex-col items-center gap-1 cursor-pointer'
					>
						{item.isProfile && user?.photo_url ? (
							<div className={`${styles.before} group-hover:brightness-110`}>
								<img
									src={user.photo_url}
									alt={item.label}
									className='rounded-full group-hover:ring-2 group-hover:ring-white transition-all'
									width={24}
									height={24}
								/>
							</div>
						) : (
							item.icon && (
								<item.icon
									fill={isActive ? 'white' : '#828289'}
									color='#828289'
									className='transition-all duration-200 group-hover:fill-white'
								/>
							)
						)}
						<span
							className={`font-medium text-xs transition-all duration-200 ${
								isActive
									? 'text-white'
									: 'text-[var(--object-secondary-white)] group-hover:text-white'
							}`}
						>
							{item.label}
						</span>
					</button>
				);
			})}
		</nav>
	);
};
