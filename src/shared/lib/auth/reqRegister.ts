import { telegramRegisterInstance } from '@/shared/api/telegramInstance';

export const reqRegister = (userData: Record<string, unknown>) => {
	console.log('reqRegister: начинаем запрос регистрации', { userData });

	return telegramRegisterInstance
		.post('auth-old/v1/telegram/register', userData)
		.then(response => {
			console.log('reqRegister: запрос успешен', response.data);
			return response;
		})
		.catch(error => {
			console.error('reqRegister: ошибка запроса', error);
			throw error;
		});
};
