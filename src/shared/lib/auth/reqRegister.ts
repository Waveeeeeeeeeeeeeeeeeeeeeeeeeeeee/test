import { telegramRegisterInstance } from '@/shared/api/telegramInstance';

export const reqRegister = (userData: any, initData: any) => {
	return telegramRegisterInstance.post(
		'auth-old/v1/telegram/register',
		{
			...userData
		},
		{
			headers: {
				'X-Telegram-Init-Data': JSON.stringify(initData)
			}
		}
	);
};
