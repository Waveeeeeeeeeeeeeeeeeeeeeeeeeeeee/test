import { Ticket } from './types';

export const mockTickets: Ticket[] = [
	{
		id: '1',
		title: 'Проблема с авторизацией',
		description:
			'Не могу войти в аккаунт, постоянно выдает ошибку "Неверный пароль"',
		status: 'open',
		icon: '🔐',
		createdAt: '2024-01-15T10:30:00Z',
		updatedAt: '2024-01-15T10:30:00Z'
	},
	{
		id: '2',
		title: 'Ошибка в поиске игроков',
		description: 'При поиске игроков по фильтрам не отображаются результаты',
		status: 'in_progress',
		icon: '🔍',
		createdAt: '2024-01-14T15:45:00Z',
		updatedAt: '2024-01-16T09:20:00Z'
	},
	{
		id: '3',
		title: 'Проблема с уведомлениями',
		description: 'Не приходят push-уведомления о новых сообщениях',
		status: 'resolved',
		icon: '🔔',
		createdAt: '2024-01-13T08:15:00Z',
		updatedAt: '2024-01-15T14:30:00Z'
	},
	{
		id: '4',
		title: 'Ошибка загрузки фото',
		description: 'Не могу загрузить фото профиля, приложение крашится',
		status: 'closed',
		icon: '📷',
		createdAt: '2024-01-12T12:00:00Z',
		updatedAt: '2024-01-14T16:45:00Z'
	},
	{
		id: '5',
		title: 'Проблема с чатом',
		description: 'Сообщения в чате не отправляются, зависает на "Отправка..."',
		status: 'open',
		icon: '💬',
		createdAt: '2024-01-16T11:20:00Z',
		updatedAt: '2024-01-16T11:20:00Z'
	}
];
