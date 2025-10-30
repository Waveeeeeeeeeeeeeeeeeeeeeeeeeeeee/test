import { useTranslation } from 'react-i18next';

type TranslationsObject = Record<string, string>;

export const useCustomTranslation = (chapter: string) => {
  const { t } = useTranslation();

  const translations = t(chapter, {
    returnObjects: true
  }) as TranslationsObject;

  return translations;
};