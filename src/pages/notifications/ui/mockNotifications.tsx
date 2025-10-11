import HeadphonesIcon from '@/shared/assets/icons/headphones.svg?react';
import HeartIcon from '@/shared/assets/icons/heart.svg?react';
import MessageIcon from '@/shared/assets/icons/message.svg?react';

export interface NotificationItem {
	id: string;
	type: 'all' | 'likes' | 'invitations';
	isNew: boolean;
	avatar?: string;
	icon?: React.ReactNode;
	userName?: string;
	mainText: string;
	subText: string;
	messagePreview?: string;
	actionIcon?: React.ReactNode;
	heartIcon?: React.ReactNode;
	multipleAvatars?: string[];
}

export const mockNotifications: NotificationItem[] = [
	{
		id: '1',
		type: 'likes',
		isNew: true,
		userName: 'Multiple Users',
		mainText: 'Вашу анкету лайкнули 3 человека',
		subText: 'Oleg Staravoit, KarinKa, Babgw',
		heartIcon: (
			<HeartIcon fill='white' style={{ width: '40px', height: '40px' }} />
		),
		multipleAvatars: [
			'https://avatar.iran.liara.run/public/41',
			'https://avatar.iran.liara.run/public/42',
			'https://avatar.iran.liara.run/public/43'
		]
	},
	{
		id: '2',
		type: 'all',
		isNew: false,
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
		userName: 'Oleg Staravoit',
		mainText: 'Oleg Staravoit 12.03. 14:45',
		subText: 'У вас новое сообщение',
		messagePreview: 'Внезапно, тщательные исследования к...',
		actionIcon: <MessageIcon fill='#9ca3af' />
	},
	{
		id: '3',
		type: 'likes',
		isNew: false,
		avatar:
			'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
		userName: 'KarinKa',
		mainText: '12.03. 14:45',
		subText: 'Новый лайк на анкету!',
		messagePreview: 'Вы понравились KarinKa',
		actionIcon: <HeartIcon fill='white' />
	},
	{
		id: '4',
		type: 'invitations',
		isNew: false,
		icon: <HeadphonesIcon fill='#9ca3af' />,
		userName: 'Administrator',
		mainText: '12.03. 14:45',
		subText: 'Вам ответил администратор',
		messagePreview: 'Внезапно, тщательные исследования к...',
		actionIcon: <MessageIcon fill='#9ca3af' />
	}
];
