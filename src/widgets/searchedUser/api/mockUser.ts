import { UserProfile } from '@/entities/user/model/types';

export const mockUser: UserProfile[] = [
	{
		nickname: 'Ирина Кузнецова',
		image: 'https://i.pravatar.cc/300',
		age: '20',
		city: 'Москва',
		country: 'Россия',
		gender: 'Женщина',
		selectedLanguage: 'Русский',
		country_code: 'RU',
		about:
			'Учитывая ключевые сценарии поведения, внедрение современных методик предоставляет широкие возможности для глубоко мысленных рассуждений.',
		interests: [
			'Киберспорт',
			'Футбол',
			'Плавание',
			'Бокс',
			'Волейбол',
			'Баскетбол',
			'Теннис',
			'Нарды'
		],
		games: ['Pubg Mobile', 'Dota 2', 'CS:GO']
	}
];
