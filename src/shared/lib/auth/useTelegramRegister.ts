import { useEffect } from 'react';

import { generateInitDataFromTelegram } from './generateInitData';
import { reqRegister } from './reqRegister';
import { useUserStore } from '@/entities/user/model/store';

export const useTelegramRegister = () => {
	useEffect(() => {
		const register = async () => {
			try {
				const { telegram, telegramQueryId, telegramAuthDate, userHash } =
					useUserStore.getState();

				if (!telegram || !telegramQueryId || !telegramAuthDate) {
					throw new Error('Telegram data not found');
				}

				const initData = generateInitDataFromTelegram(
					telegram,
					telegramAuthDate,
					telegramQueryId,
					userHash || undefined
				);

				const userData = {
					telegram_id: telegram.id
				};

				const res = await reqRegister(userData, initData);
			} catch (e: unknown) {
				const error = e as { response?: { data?: unknown }; message?: string };
				console.error(
					'Registration error:',
					error.response?.data || error.message
				);
			}
		};

		register();
	}, []);
};
