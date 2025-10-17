import {
	expandViewport,
	init,
	initDataUser,
	restoreInitData,
	retrieveLaunchParams,
	retrieveRawInitData,
	swipeBehavior
} from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '@/entities/user/model/store';

// Функция для отправки WebApp данных на сервер
const sendWebAppDataToServer = async (
	rawInitData: string,
	result: { tgWebAppData?: unknown }
) => {
	try {
		const webAppData = {
			rawInitData,
			tgWebAppData: result.tgWebAppData,
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			url: window.location.href
		};

		console.log('Отправляем WebApp данные на сервер:', webAppData);

		// Отправляем на ваш API endpoint
		const response = await fetch('/api/webapp-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(webAppData)
		});

		if (response.ok) {
			console.log('WebApp данные успешно отправлены на сервер');
		} else {
			console.warn('Ошибка отправки WebApp данных:', response.status);
		}
	} catch (error) {
		console.error('Ошибка при отправке WebApp данных:', error);
	}
};

export const useMainApp = () => {
	const [isReady, setIsReady] = useState(false);
	const {
		setTelegramUser,
		setUserHash,
		setTelegramQueryId,
		setTelegramInitData,
		setTelegramAuthDate
	} = useUserStore();
	const { i18n } = useTranslation();

	useEffect(() => {
		const initApp = () => {
			try {
				init();
				restoreInitData();
				expandViewport();
				swipeBehavior.mount();
				swipeBehavior.disableVertical();

				let tgWebAppData;
				let initDataString;

				try {
					const result = retrieveLaunchParams();
					const rawInitData = retrieveRawInitData();

					// Логируем все данные WebApp для анализа
					console.log('=== TELEGRAM WEBAPP DATA ===');
					const telegram = (window as unknown as { Telegram?: { WebApp?: { initData?: string; version?: string; platform?: string } } }).Telegram;
					console.log('window.Telegram:', telegram);
					console.log('window.Telegram.WebApp:', telegram?.WebApp);
					console.log('window.Telegram.WebApp.initData:', telegram?.WebApp?.initData);
					console.log('window.Telegram.WebApp.version:', telegram?.WebApp?.version);
					console.log('window.Telegram.WebApp.platform:', telegram?.WebApp?.platform);
					console.log('RAW INIT DATA:', rawInitData);
					console.log('RESULT:', result);
					console.log('tgWebAppData:', result.tgWebAppData);
					console.log('===========================');

					// Отправляем данные на сервер для сбора статистики
					if (rawInitData) {
						sendWebAppDataToServer(rawInitData, result);
					}

					tgWebAppData = result.tgWebAppData;
				} catch (error) {
					console.error('retrieveLaunchParams failed:', error);
					console.log('=== FALLBACK DEBUG ===');
					const telegram = (window as unknown as { Telegram?: { WebApp?: { initData?: string; version?: string; platform?: string } } }).Telegram;
					console.log('window.Telegram:', telegram);
					console.log('window.Telegram.WebApp:', telegram?.WebApp);
					console.log('window.Telegram.WebApp.initData:', telegram?.WebApp?.initData);
					console.log('=====================');
					
					const user = initDataUser();
					console.log('initDataUser():', user);

					if (user) {
						tgWebAppData = { user };
						initDataString =
							(
								window as unknown as {
									Telegram?: { WebApp?: { initData?: string } };
								}
							).Telegram?.WebApp?.initData || null;
						console.log('tgWebAppData from fallback:', tgWebAppData);
						console.log('initDataString from fallback:', initDataString);
					} else {
						tgWebAppData = null;
						console.log('No user data found in fallback');
					}
				}

				if (tgWebAppData?.user) {
					setTelegramUser(tgWebAppData.user);

					if (tgWebAppData.hash) {
						setUserHash(tgWebAppData.hash);
					}
					if (tgWebAppData.query_id) {
						setTelegramQueryId(tgWebAppData.query_id);
					}
					if (tgWebAppData.auth_date) {
						let authTimestamp: number;

						if (typeof tgWebAppData.auth_date === 'number') {
							authTimestamp = tgWebAppData.auth_date;
						} else if (typeof tgWebAppData.auth_date === 'string') {
							authTimestamp = Math.floor(
								new Date(tgWebAppData.auth_date).getTime() / 1000
							);
						} else {
							authTimestamp = Math.floor(
								tgWebAppData.auth_date.getTime() / 1000
							);
						}

						setTelegramAuthDate(authTimestamp);
					}
					if (initDataString && typeof initDataString === 'string') {
						setTelegramInitData(initDataString);
					}
				}

				const languageCodeFromLs = localStorage.getItem('language_code');
				if (languageCodeFromLs) {
					i18n.changeLanguage(languageCodeFromLs);
				}

				setIsReady(true);
			} catch (error) {
				console.error('useMainApp initialization error:', error);
				setIsReady(true);
			}
		};

		initApp();
	}, [
		setTelegramUser,
		setUserHash,
		setTelegramQueryId,
		setTelegramInitData,
		setTelegramAuthDate,
		i18n
	]);

	return {
		showContent: isReady,
		shouldRedirectToOnboarding: false,
		isAuthChecking: false
	};
};
