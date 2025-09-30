import { telegramLoginInstance } from '@/shared/api/telegramInstance';

export const reqLogin = data => {
	console.log(data);

	return telegramLoginInstance.post(
		'auth-old/v1/telegram/login',
		{},
		{
			headers: {
				'X-Telegram-Init-Data': `${data}`
			}
		}
	);
};
