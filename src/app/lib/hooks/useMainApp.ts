import {
	expandViewport,
	init,
	initDataUser,
	restoreInitData,
	retrieveLaunchParams,
	swipeBehavior
} from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { mapApiProfileToStore } from '@/app/utils/mapApiProfileToStore';
import { getProfileByTelegramId } from '@/entities/user/api/getProfileByTelegramId';
import { useUserStore } from '@/entities/user/model/store';
import { reqLogin } from '@/shared/lib/auth/reqRegister';

export const useMainApp = () => {
	const [isReady, setIsReady] = useState(false);
	const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState<
		boolean | null
	>(null);
	const [minLoadingPassed, setMinLoadingPassed] = useState(false);

	const { i18n } = useTranslation();
	const { setTelegramUser, setUserHash, setProfile } = useUserStore();

	useEffect(() => {
		const timer = setTimeout(() => setMinLoadingPassed(true), 3500);

		const initApp = async () => {
			try {
				init();
				restoreInitData();
				expandViewport();
				swipeBehavior.mount();
				swipeBehavior.disableVertical();

				const { tgWebAppData } = await retrieveLaunchParams();
				console.log('tgWebAppData:', tgWebAppData);

				// const login = async () => {
				// 	try {
				// 		alert('tgWebAppData: ' + JSON.stringify(tgWebAppData));

				// 		// Формируем правильный формат данных для сервера
				// 		const initData = {
				// 			auth_date: tgWebAppData.auth_date
				// 				? typeof tgWebAppData.auth_date === 'string'
				// 					? Math.floor(
				// 							new Date(tgWebAppData.auth_date).getTime() / 1000
				// 						)
				// 					: tgWebAppData.auth_date
				// 				: Math.floor(Date.now() / 1000),
				// 			query_id: tgWebAppData.query_id,
				// 			user: tgWebAppData.user
				// 				? JSON.stringify(tgWebAppData.user)
				// 				: undefined,
				// 			hash: tgWebAppData.hash
				// 		};

				// 		// Удаляем undefined поля
				// 		Object.keys(initData).forEach(
				// 			key =>
				// 				initData[key as keyof typeof initData] === undefined &&
				// 				delete initData[key as keyof typeof initData]
				// 		);

				// 		alert('Formatted initData: ' + JSON.stringify(initData));
				// 		const res = await reqLogin(initData);
				// 		alert('Login response: ' + JSON.stringify(res.data));
				// 	} catch (e: any) {
				// 		alert('Login error: ' + JSON.stringify(e));
				// 	}
				// };

				// await login();

				if (tgWebAppData?.user && !useUserStore.getState().user) {
					console.log('tgWebAppData', tgWebAppData);
					setUserHash(tgWebAppData.hash);
					setTelegramUser(tgWebAppData.user);
				}

				const languageCodeFromLs = localStorage.getItem('language_code');
				if (languageCodeFromLs) {
					i18n.changeLanguage(languageCodeFromLs);
				} else {
					const languageCode = initDataUser()?.language_code;
					if (languageCode === 'ru') i18n.changeLanguage('ru');
				}

				const userId = tgWebAppData?.user?.id;
				if (userId) {
					const profile = await getProfileByTelegramId(userId.toString());
					if (profile) {
						setProfile(mapApiProfileToStore(profile));
						setShouldRedirectToOnboarding(false);
					} else {
						setShouldRedirectToOnboarding(true);
					}
				}
			} catch (e) {
				console.error('Ошибка инициализации:', e);
				setShouldRedirectToOnboarding(true);
			} finally {
				setIsReady(true);
			}
		};

		initApp();

		return () => clearTimeout(timer);
	}, [i18n, setTelegramUser, setUserHash, setProfile]);

	return {
		showContent:
			minLoadingPassed && isReady && shouldRedirectToOnboarding !== null,
		shouldRedirectToOnboarding
	};
};
