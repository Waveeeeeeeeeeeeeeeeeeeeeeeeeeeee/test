import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from '@/app/assets/locales/locales';

i18next.use(initReactI18next).init({
	fallbackLng: 'ru',
	returnObjects: true,
	lng: 'en',
	resources: locales
});
