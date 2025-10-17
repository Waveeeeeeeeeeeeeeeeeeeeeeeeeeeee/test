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

					console.log('=== TELEGRAM WEBAPP DATA ===');
					console.log('RAW INIT DATA:', rawInitData);
					console.log('RESULT:', result);
					console.log(
						'tgWebAppData:',
						JSON.stringify(result.tgWebAppData, null, 2)
					);
					console.log('===========================');

					const debugElement = document.getElementById('telegram-debug');
					if (debugElement) {
						debugElement.style.display = 'block';
						debugElement.innerHTML = `
							<h3>TELEGRAM WEBAPP DATA</h3>
							<p><strong>RAW INIT DATA:</strong> ${rawInitData || 'Нет данных'}</p>
							<p><strong>RESULT:</strong></p>
							<pre>${JSON.stringify(result, null, 2)}</pre>
							<p><strong>tgWebAppData:</strong></p>
							<pre>${JSON.stringify(result.tgWebAppData, null, 2)}</pre>
						`;
					}

					tgWebAppData = result.tgWebAppData;
				} catch (error) {
					console.error('retrieveLaunchParams failed:', error);
					const user = initDataUser();

					if (user) {
						tgWebAppData = { user };
						initDataString =
							(
								window as unknown as {
									Telegram?: { WebApp?: { initData?: string } };
								}
							).Telegram?.WebApp?.initData || null;
					} else {
						tgWebAppData = null;
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
