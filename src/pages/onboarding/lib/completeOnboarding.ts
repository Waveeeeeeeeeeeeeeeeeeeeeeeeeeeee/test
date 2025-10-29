import { useUserStore } from '@/entities/user/model/store';
import { UserProfile } from '@/entities/user/model/types';
import {
	CreateProfileParams,
	createProfile
} from '@/shared/api/endpoints/createProfile';
import { registerAfterOnboarding } from '@/shared/lib/auth/registerAfterOnboarding';

type Params = UserProfile & {
	serviceId: number;
	telegramId: number;
};

/**
 * Преобразует возраст в возрастную группу
 */
const getAgeRange = (age: string | number): string => {
	const ageNum = typeof age === 'string' ? parseInt(age) : age;
	if (isNaN(ageNum)) return '18-24';

	if (ageNum < 18) return '14-17';
	if (ageNum <= 24) return '18-24';
	if (ageNum <= 30) return '25-30';
	return '30+';
};

/**
 * Преобразует тип поиска из формата приложения в формат API
 */
const mapSearchType = (
	selectedMatchType: string
): CreateProfileParams['search_type'] => {
	switch (selectedMatchType) {
		case 'realLife':
			return 'REAL_MEETING';
		case 'online':
			return 'JUST_PLAY';
		default:
			return 'JUST_PLAY';
	}
};

/**
 * Преобразует данные профиля в формат для создания профиля через API
 */
const mapProfileToCreateProfileParams = (
	profile: UserProfile
): CreateProfileParams => {
	const searchType = mapSearchType(profile.selectedMatchType);
	return {
		gender: profile.gender || 'MALE',
		age_range: getAgeRange(profile.age),
		search_type: searchType,
		about: profile.about || '',
		hobbies:
			profile.interests && profile.interests.length > 0
				? profile.interests.join(', ')
				: undefined,
		game_platform: profile.selectedPlatform || [],
		activity_time:
			searchType === 'JUST_PLAY' &&
			profile.selectedPrime &&
			profile.selectedPrime.length > 0
				? profile.selectedPrime[0].toUpperCase()
				: undefined
	};
};

export const completeOnboarding = async (profile: Params): Promise<void> => {
	const { telegram } = useUserStore.getState();

	if (!telegram) {
		throw new Error('Telegram пользователь не найден');
	}

	// 1. Сначала регистрируем пользователя
	await registerAfterOnboarding(profile);

	// 2. После успешной регистрации создаем профиль
	// user_id и profile_id подтягиваются из токена автоматически при каждом API запросе
	const profileData = mapProfileToCreateProfileParams(profile);
	await createProfile(profileData);

	// user_id и profile_id не сохраняем и не возвращаем - они автоматически берутся из токена
};
