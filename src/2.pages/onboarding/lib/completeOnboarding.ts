import {
  createUser,
  createDevice,
  createProfile,
  createProfileMedia,
  setProfileGamesWithPurposes,
} from '@/6.shared/api/endpoints'

import { UserProfile } from '@/5.entities/user/model/types'
import { useUserStore } from '@/5.entities/user/model/store'

type Params = UserProfile & {
  serviceId: number
  telegramId: number
}

export const completeOnboarding = async (profile: Params): Promise<{ userId: number; profileId: number }> => {
  
  const { setUserAndProfileIds } = useUserStore.getState()
  const user = await createUser({
    name: profile.nickname,
    lang: profile.selectedLanguage.toUpperCase(),
    city: profile.city,
    country: profile.country,
    country_code: profile.country,
    email: null,
    password_hash: null,
    telegram_id: profile.telegramId,
  })

    const userId = user.id;

  await createDevice({
    user_id: userId,
    service_id: profile.serviceId,
    platform: 'Web_App',
    push_service_token: null,
  })

   const createdProfile  = await createProfile({
    user_id: userId,
    age: Number(profile.age),
    gender: profile.gender ?? 'MALE',
    about: profile.about,
    hobbies: profile.interests.join(', '),
  })

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
      thumbnail_object_key: 'thumb.jpg',
    })
  }

  for (const game of profile.games) {
    if (game.purposes?.length) {
      await setProfileGamesWithPurposes({
        profile_id: profileId,
        game_id: Number(game.id),
        purpose_ids: game.purposes.map(Number),
      })
    }
  }

  return { userId: userId, profileId: profileId }
}
