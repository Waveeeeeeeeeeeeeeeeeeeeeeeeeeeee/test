import { telegramRegisterInstance } from '@/shared/api/telegramInstance';

interface TelegramInitData {
	auth_date: number;
	query_id: string;
	user: string;
	hash: string;
}

export const reqLogin = (initData: TelegramInitData) => {
	return telegramRegisterInstance.post(
		'auth-old/v1/telegram/login',
		{},
		{
			headers: {
				'X-Telegram-Init-Data': JSON.stringify(initData)
			}
		}
	);
};
