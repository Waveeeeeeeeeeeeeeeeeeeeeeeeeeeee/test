import { generateInitDataFromTelegram } from './generateInitData';
import { reqRegister } from './reqRegister';
import { useUserStore } from '@/entities/user/model/store';

export const registerAfterOnboarding = async (profile: {
  nickname: string;
  selectedLanguage: string;
  city: string;
  country: string;
  country_code?: string;
  selectedMatchType: string;
}) => {
  const { telegram, telegramQueryId, telegramAuthDate, userHash } =
  useUserStore.getState();

  if (!telegram || !telegramQueryId || !telegramAuthDate) {
    throw new Error('Telegram данные не найдены');
  }

  const userData: Record<string, unknown> = {
    nickname: profile.nickname,
    lang: profile.selectedLanguage.toUpperCase(),
    city: profile.city,
    country: profile.country,
    telegram_id: telegram.id,
    search_type: profile.selectedMatchType
  };

  if (profile.country_code && profile.country_code.trim() !== '') {
    userData.country_code = profile.country_code;
  }

  const initData = generateInitDataFromTelegram(
    telegram,
    telegramAuthDate,
    telegramQueryId,
    userHash || undefined
  );

  const response = await reqRegister(userData, initData);
  return response.data;
};