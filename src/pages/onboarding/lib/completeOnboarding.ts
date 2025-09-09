import { useUserStore } from '@/entities/user/model/store'
import { UserProfile } from '@/entities/user/model/types'
import {
	createProfile,
	createProfileMedia,
	createUser,
	setProfileGamesWithPurposes
	// createDevice,
} from '@/shared/api/endpoints'
import { getLocationDetails } from '@/shared/services/location-service'

type Params = UserProfile & {
	serviceId: number
	telegramId: number
}

export const completeOnboarding = async (
	profile: Params
): Promise<{ userId: number; profileId: number }> => {
	const { setUserAndProfileIds, setCountryCode } = useUserStore.getState()
	const countryCode = await getLocationDetails(profile.country, profile.city)

	setCountryCode(countryCode)
	const user = await createUser({
		name: profile.nickname,
		lang: profile.selectedLanguage.toUpperCase(),
		city: profile.city,
		country: profile.country,
		country_code: countryCode,
		email: null,
		password_hash: null,
		telegram_id: profile.telegramId
	})

	const userId = user.id

	console.log(userId)

	// await createDevice({
	//   user_id: userId,
	//   service_id: profile.serviceId,
	//   platform: 'WEB_APP',
	//   push_service_token: null,
	// })

	const createdProfile = await createProfile({
		user_id: userId,
		age: Number(profile.age),
		gender: profile.gender ?? 'MALE',
		about: profile.about,
		hobbies: profile.interests.join(', ')
	})

	const profileId = createdProfile.id

	setUserAndProfileIds(userId, profileId)

	if (profile.image) {
		await createProfileMedia({
			profile_id: profileId,
			format: 'JPEG',
			bucket_url: '',
			bucket_name: 'your-bucket',
			bucket_region: 'your-region',
			object_key: 'original.jpg',
			thumbnail_object_key: 'thumb.jpg'
		})
	}

	const gamesWithPurposes = profile.games.reduce(
		(acc, game) => {
			acc[game.id] = game.purposes.map(p => p.purpose_id)
			return acc
		},
		{} as Record<string, number[]>
	)

	await setProfileGamesWithPurposes({
		profile_id: profileId,
		games_with_purposes: gamesWithPurposes
	})

	return { userId: userId, profileId: profileId }
}
