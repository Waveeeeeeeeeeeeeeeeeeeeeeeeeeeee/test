import { telegramRegisterInstance } from '@/shared/api/telegramInstance';

export const reqRegister = (
	userData: Record<string, unknown>,
	initData: {
		auth_date: number;
		query_id: string;
		user: string;
		hash: string;
	}
) => {
	return telegramRegisterInstance
		.post('auth-old/v1/telegram/register', userData, {
			headers: {
				'X-Telegram-Init-Data': JSON.stringify(initData)
			}
		})
		.then(response => {
			console.log('Server response:', response.data);
			return response;
		})
		.catch(error => {
			console.log('Server response:', error.response?.data || error.message);
			throw error;
		});
};
