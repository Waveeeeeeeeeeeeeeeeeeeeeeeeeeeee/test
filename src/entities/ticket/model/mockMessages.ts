import { TicketMessage } from './messageTypes';

export const mockMessages: { [ticketId: string]: TicketMessage[] } = {
	'1': [
		{
			id: 'msg_1_1',
			ticketId: '1',
			sender: 'user',
			content:
				'Здравствуйте! У меня проблема с авторизацией. Не могу войти в аккаунт.',
			timestamp: '2024-01-15T10:30:00Z',
			isRead: true
		},
		{
			id: 'msg_1_2',
			ticketId: '1',
			sender: 'support',
			content:
				'Здравствуйте! Мы получили ваше обращение. Проверим проблему с авторизацией.',
			timestamp: '2024-01-15T11:15:00Z',
			isRead: true
		},
		{
			id: 'msg_1_3',
			ticketId: '1',
			sender: 'user',
			content: 'Спасибо за быстрый ответ! Проблема все еще актуальна.',
			timestamp: '2024-01-15T14:20:00Z',
			isRead: true
		}
	],
	'2': [
		{
			id: 'msg_2_1',
			ticketId: '2',
			sender: 'user',
			content:
				'При поиске игроков не отображаются результаты. Фильтры не работают.',
			timestamp: '2024-01-14T15:45:00Z',
			isRead: true
		},
		{
			id: 'msg_2_2',
			ticketId: '2',
			sender: 'support',
			content: 'Понял проблему. Наша команда работает над исправлением поиска.',
			timestamp: '2024-01-14T16:30:00Z',
			isRead: true
		}
	],
	'3': [
		{
			id: 'msg_3_1',
			ticketId: '3',
			sender: 'user',
			content: 'Не приходят уведомления о новых сообщениях.',
			timestamp: '2024-01-13T08:15:00Z',
			isRead: true
		},
		{
			id: 'msg_3_2',
			ticketId: '3',
			sender: 'support',
			content: 'Проблема решена! Проверьте настройки уведомлений в приложении.',
			timestamp: '2024-01-15T14:30:00Z',
			isRead: true
		}
	]
};
