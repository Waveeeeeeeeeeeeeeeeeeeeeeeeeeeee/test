import { adaptGames } from '@/entities/game/utils/adaptedData'

export const mapApiProfileToStore = (apiData: any) => {
	return {
		age: apiData.age?.toString() || '',
		nickname: apiData.user?.name || '',
		gender: apiData.gender || 'MALE',
		city: apiData.user?.city || '',
		country: apiData.user?.country || '',
		about: apiData.about || '',
		interests: apiData.hobbies
			? apiData.hobbies.split(',').map((s: string) => s.trim())
			: [],
		games: adaptGames(apiData.games),
		image: null,
		selectedLanguage: localStorage.getItem('selectedLanguage') || 'ru',
		selectedMatchType: 'realLife',
		user_id: apiData.user?.id || null,
		country_code: apiData.user?.country_code || '',
		profile_id: apiData.id,
		isFirstFormValid: true,
		isSecondFormValid: true
	}
}
