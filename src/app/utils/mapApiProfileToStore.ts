import { GamesResponse } from '@/entities/game/api/getGamesWithPurposes';
import { adaptGames } from '@/entities/game/utils/adaptedData';

type ApiProfile = {
	id: string | number;
	age?: number;
	gender?: 'MALE' | 'FEMALE';
	about?: string;
	hobbies?: string;
	games?: GamesResponse;
	user?: {
		id?: string | number;
		name?: string;
		city?: string;
		country?: string;
		country_code?: string;
		platform?: string;
	};
};

export type StoreProfile = {
	age: string;
	nickname: string;
	gender: 'MALE' | 'FEMALE';
	city: string;
	country: string;
	about: string;
	interests: string[];
	games: ReturnType<typeof adaptGames>;
	image: null;
	selectedLanguage: string;
	selectedMatchType: 'realLife';
	user_id: string | number | null;
	country_code: string;
	profile_id: string | number;
	isFirstFormValid: boolean;
	isSecondFormValid: boolean;
	selectedPlatform: string[];
	selectedCountry: string[];
};

export const mapApiProfileToStore = (apiData: ApiProfile): StoreProfile => {
	const gamesData =
		apiData.games && 'games_with_purposes' in apiData.games
			? apiData.games
			: { games_with_purposes: [] };
	return {
		age: apiData.age?.toString() || '',
		nickname: apiData.user?.name || '',
		gender: apiData.gender || 'MALE',
		city: apiData.user?.city || '',
		country: apiData.user?.country || '',
		about: apiData.about || '',
		interests: apiData.hobbies
			? apiData.hobbies.split(',').map(s => s.trim())
			: [],
		games: adaptGames(gamesData),
		image: null,
		selectedLanguage: localStorage.getItem('selectedLanguage') || 'ru',
		selectedMatchType: 'realLife',
		selectedPlatform: apiData.user?.platform ? [apiData.user.platform] : [],
		selectedCountry: [],
		user_id: apiData.user?.id || null,
		country_code: apiData.user?.country_code || '',
		profile_id: apiData.id,

		isFirstFormValid: true,
		isSecondFormValid: true
	};
};
