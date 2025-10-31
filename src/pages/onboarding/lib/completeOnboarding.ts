import { useUserStore } from '@/entities/user/model/store';
import { UserProfile } from '@/entities/user/model/types';
import {
  CreateProfileParams,
  createProfile } from
'@/shared/api/endpoints/createProfile';
import { registerAfterOnboarding } from '@/shared/lib/auth/registerAfterOnboarding';

type Params = UserProfile & {
  serviceId: number;
  telegramId: number;
};




const getAgeRange = (age: string | number): string => {
  const ageNum = typeof age === 'string' ? parseInt(age) : age;
  if (isNaN(ageNum)) return '18-24';

  if (ageNum < 18) return '14-17';
  if (ageNum <= 24) return '18-24';
  if (ageNum <= 30) return '25-30';
  return '30+';
};




const mapSearchType = (
selectedMatchType: string)
: CreateProfileParams['search_type'] => {
  switch (selectedMatchType) {
    case 'realLife':
      return 'REAL_MEETING';
    case 'online':
      return 'JUST_PLAY';
    default:
      return 'JUST_PLAY';
  }
};




const mapProfileToCreateProfileParams = (
profile: UserProfile)
: CreateProfileParams => {
  const searchType = mapSearchType(profile.selectedMatchType);
  return {
    gender: profile.gender || 'MALE',
    age_range: getAgeRange(profile.age),
    search_type: searchType,
    about: profile.about || '',
    hobbies:
    profile.interests && profile.interests.length > 0 ?
    profile.interests.join(', ') :
    undefined,
    game_platform: profile.selectedPlatform || [],
    activity_time:
    searchType === 'JUST_PLAY' &&
    profile.selectedPrime &&
    profile.selectedPrime.length > 0 ?
    profile.selectedPrime[0].toUpperCase() :
    undefined
  };
};

export const completeOnboarding = async (profile: Params): Promise<void> => {
  console.log('completeOnboarding: начало', profile);
  const storeState = useUserStore.getState();
  console.log('completeOnboarding: состояние стора', {
    telegram: storeState.telegram,
    user: storeState.user,
    telegramInitData: storeState.telegramInitData,
    telegramQueryId: storeState.telegramQueryId,
    telegramAuthDate: storeState.telegramAuthDate
  });
  
  let telegramUser = storeState.telegram || storeState.user;
  
  if (!telegramUser && storeState.telegramInitData) {
    try {
      const initDataStr = storeState.telegramInitData;
      let parsedUser: unknown = null;
      
      if (initDataStr.startsWith('{')) {
        const initDataParsed = JSON.parse(initDataStr);
        if (initDataParsed.user) {
          if (typeof initDataParsed.user === 'string') {
            parsedUser = JSON.parse(initDataParsed.user);
          } else if (typeof initDataParsed.user === 'object') {
            parsedUser = initDataParsed.user;
          }
        }
      } else {
        const parts = initDataStr.split(/\\n|\n/);
        for (const part of parts) {
          if (part.startsWith('user=')) {
            const userStr = part.substring(5).trim();
            try {
              parsedUser = JSON.parse(userStr);
            } catch {
              parsedUser = userStr;
            }
            break;
          }
        }
      }
      
      if (parsedUser && typeof parsedUser === 'object') {
        telegramUser = parsedUser as typeof telegramUser;
        console.log('completeOnboarding: извлекли пользователя из telegramInitData', telegramUser);
      }
    } catch (e) {
      console.error('completeOnboarding: ошибка парсинга telegramInitData', e);
    }
  }
  
  if (!telegramUser) {
    const windowTelegram = (window as unknown as { Telegram?: { WebApp?: { initData?: string; initDataUnsafe?: { user?: unknown } } } }).Telegram?.WebApp;
    console.warn('completeOnboarding: Telegram пользователь не найден, пытаемся получить из window', {
      windowTelegramUser: windowTelegram?.initDataUnsafe?.user,
    });
    
    if (windowTelegram?.initDataUnsafe?.user) {
      telegramUser = windowTelegram.initDataUnsafe.user as typeof telegramUser;
      console.log('completeOnboarding: используем telegram пользователя из window.Telegram.WebApp');
    }
  }
  
  if (!telegramUser) {
    console.error('completeOnboarding: Telegram пользователь не найден ни в сторе, ни в telegramInitData, ни в window');
    throw new Error('Telegram пользователь не найден');
  }

  console.log('completeOnboarding: вызов registerAfterOnboarding с telegramUser:', telegramUser);
  await registerAfterOnboarding({ ...profile, telegramId: telegramUser.id || profile.telegramId });
  console.log('completeOnboarding: registerAfterOnboarding завершен');



  const profileData = mapProfileToCreateProfileParams(profile);
  await createProfile(profileData);


};