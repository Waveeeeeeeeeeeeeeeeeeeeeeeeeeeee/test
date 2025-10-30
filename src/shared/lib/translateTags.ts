import { useCustomTranslation } from './hooks/useCustomTranslation';

const tagMapping: Record<string, string> = {
  Россия: 'russia',
  Беларусь: 'belarus',
  Украина: 'ukraine',
  Праки: 'praks',
  ТDM: 'tdm',
  TDM: 'tdm',
  UltimateRoyal: 'ultimateRoyal',
  'Утро (6:00 - 12:00)': 'morning',
  'День (12:00 - 18:00)': 'afternoon',
  'Вечер (18:00 - 00:00)': 'evening',
  'Ночь (00:00 - 6:00)': 'night',
  Киберспорт: 'cybersport',
  Футбол: 'football',
  Плавание: 'swimming',
  Бокс: 'boxing',
  Волейбол: 'volleyball',
  Баскетбол: 'basketball',
  Теннис: 'tennis',
  Нарды: 'backgammon'
};

export const useTranslateTags = () => {
  const tags = useCustomTranslation('tags');

  const translateTag = (tag: string): string => {
    const key = tagMapping[tag];
    if (key && tags[key]) {
      return tags[key];
    }
    return tag;
  };

  const translateTags = (tagsArray: string[]): string[] => {
    return tagsArray.map(translateTag);
  };

  return { translateTag, translateTags };
};