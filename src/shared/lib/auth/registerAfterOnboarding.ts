import { generateInitDataFromTelegram } from './generateInitData';
import { reqRegister } from './reqRegister';
import { useUserStore } from '@/entities/user/model/store';

// Функция для логирования в DOM
const logToDOM = (message: string) => {
	const logElement = document.getElementById('debug-log');
	if (logElement) {
		logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
		logElement.scrollTop = logElement.scrollHeight;
	}
};

export const registerAfterOnboarding = async (profile: {
	nickname: string;
	selectedLanguage: string;
	city: string;
	country: string;
	country_code?: string;
	selectedMatchType: string;
}) => {
	const { telegram, telegramQueryId, userHash, telegramAuthDate } =
		useUserStore.getState();

	if (!telegram || !telegramQueryId || !userHash || !telegramAuthDate) {
		throw new Error('Telegram данные не найдены');
	}

	const userData = {
		nickname: profile.nickname,
		lang: profile.selectedLanguage.toUpperCase(),
		city: profile.city,
		country: profile.country,
		country_code: profile.country_code || 'RU',
		telegram_id: telegram.id,
		search_type:
			profile.selectedMatchType === 'realLife' ? 'REAL_MEETING' : 'JUST_PLAY'
	};

	try {
		const initData = generateInitDataFromTelegram(
			telegram,
			telegramAuthDate,
			telegramQueryId,
			userHash
		);

		const response = await reqRegister(userData, initData);
		logToDOM('✅ Register response: ' + JSON.stringify(response.data));
		return response.data;
	} catch (error: any) {
		logToDOM(
			'❌ Register error: ' +
				JSON.stringify(error.response?.data || error.message)
		);
		throw error;
	}
};
