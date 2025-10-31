import { reqRegister } from './reqRegister';
import { useUserStore } from '@/entities/user/model/store';

export const registerAfterOnboarding = async (profile: {
	nickname: string;
	selectedLanguage: string;
	city: string;
	country: string;
	country_code?: string;
	selectedMatchType: string;
	telegramId?: number;
}) => {
	const storeState = useUserStore.getState();
	const { telegram } = storeState;

	console.log('registerAfterOnboarding: состояние стора', {
		telegram,
		telegramQueryId: storeState.telegramQueryId,
		telegramAuthDate: storeState.telegramAuthDate,
		telegramInitData: storeState.telegramInitData
	});

	const telegramId = profile.telegramId || telegram?.id;

	if (!telegramId) {
		console.error('registerAfterOnboarding: telegramId не найден', {
			telegramId,
			telegram: storeState.telegram
		});
		throw new Error('Telegram ID не найден');
	}

	const userData: Record<string, unknown> = {
		nickname: profile.nickname,
		lang: profile.selectedLanguage.toUpperCase(),
		city: profile.city,
		country: profile.country,
		telegram_id: telegramId,
		search_type: profile.selectedMatchType
	};

	if (profile.country_code && profile.country_code.trim() !== '') {
		userData.country_code = profile.country_code;
	}

	console.log('registerAfterOnboarding: вызов reqRegister', { userData });

	const response = await reqRegister(userData);
	console.log('registerAfterOnboarding: reqRegister завершен', response.data);
	return response.data;
};
