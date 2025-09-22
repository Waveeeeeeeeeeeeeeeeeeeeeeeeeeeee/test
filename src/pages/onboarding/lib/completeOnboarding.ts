import { useUserStore } from '@/entities/user/model/store';
import { UserProfile } from '@/entities/user/model/types';
import {
	createProfile,
	createProfileMedia,
	createUser,
	setProfileGamesWithPurposes
	// createDevice,
} from '@/shared/api/endpoints';
import { getLocationDetails } from '@/shared/services/location-service';

type Params = UserProfile & {
	serviceId: number;
	telegramId: number;
};

export const completeOnboarding = async (
	profile: Params
): Promise<{ userId: number; profileId: number }> => {
	const { setUserAndProfileIds, setCountryCode } = useUserStore.getState();
	const countryCode = await getLocationDetails(profile.country, profile.city);

	setCountryCode(countryCode);
	const user = await createUser({
		nickname: profile.nickname,
		lang: profile.selectedLanguage.toLocaleUpperCase(),
		city: profile.city,
		country: profile.country,
		country_code: 'RU',
		countries: JSON.stringify([
			{ code: 'RU', name: 'Russia' },
			{ code: 'US', name: 'USA' },
			{ code: 'DE', name: 'Germany' }
		]),
		email: 'zzzzzz.io@gmail.com',
		password_hash: null,
		telegram_id: 55
	});

	const userId = user.id;

	console.log(user);
	console.log(userId);

	// await createDevice({
	//   user_id: userId,
	//   service_id: profile.serviceId
	//   platform: 'WEB_APP',
	//   push_service_token: null,
	// })

	const createdProfile = await createProfile({
		user_id: 119,
		game_platform: ['PC'],
		age_range: '14-17',
		search_type: 'JUST_PLAY',
		gender: 'MALE',
		about: 'string',
		activity_time: 'MORNING',
		hobbies: 'string'
	});

	const profileId = createdProfile.id;

	setUserAndProfileIds(userId, profileId);

	if (profile.image) {
		await createProfileMedia({
			profile_id: profileId,
			format: 'JPEG',
			bucket_url: '',
			bucket_name: 'your-bucket',
			bucket_region: 'your-region',
			object_key: 'original.jpg',
			thumbnail_object_key: 'thumb.jpg'
		});
	}

	// const gamesWithPurposes = profile.games.reduce(
	// 	(acc, game) => {
	// 		acc[game.id] = game.purposes.map(p => p.purpose_id);
	// 		return acc;
	// 	},
	// 	{} as Record<string, number[]>
	// );

	// await setProfileGamesWithPurposes({
	// 	profile_id: profileId,
	// 	games_with_purposes: gamesWithPurposes
	// });

	return { userId: userId, profileId: profileId };
};
