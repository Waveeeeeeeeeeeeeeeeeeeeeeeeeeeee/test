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

					console.log('=== TELEGRAM WEBAPP DATA ===');
					console.log('RESULT:', result);
					console.log(
						'tgWebAppData:',
						JSON.stringify(result.tgWebAppData, null, 2)
					);
					console.log('===========================');

					const logToDOM = (message: string) => {
						let logElement = document.getElementById('debug-log');
						if (!logElement) {
							logElement = document.createElement('div');
							logElement.id = 'debug-log';
							logElement.style.cssText = `
								position: fixed;
								top: 10px;
								right: 10px;
								background: rgba(0,0,0,0.8);
								color: white;
								padding: 10px;
								border-radius: 5px;
								font-size: 12px;
								max-width: 300px;
								max-height: 400px;
								overflow: auto;
								z-index: 9999;
								display: block;
							`;
							document.body.appendChild(logElement);
						}
						logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
						logElement.scrollTop = logElement.scrollHeight;
					};

					logToDOM('=== TELEGRAM WEBAPP DATA ===');
					logToDOM('RESULT: ' + JSON.stringify(result, null, 2));
					logToDOM(
						'tgWebAppData: ' + JSON.stringify(result.tgWebAppData, null, 2)
					);
					logToDOM('===========================');

					tgWebAppData = result.tgWebAppData;
				} catch (error) {
					console.error('retrieveLaunchParams failed:', error);

					// Логируем ошибку в DOM
					const logToDOM = (message: string) => {
						let logElement = document.getElementById('debug-log');
						if (!logElement) {
							logElement = document.createElement('div');
							logElement.id = 'debug-log';
							logElement.style.cssText = `
								position: fixed;
								top: 10px;
								right: 10px;
								background: rgba(0,0,0,0.8);
								color: white;
								padding: 10px;
								border-radius: 5px;
								font-size: 12px;
								max-width: 300px;
								max-height: 400px;
								overflow: auto;
								z-index: 9999;
								display: block;
							`;
							document.body.appendChild(logElement);
						}
						logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
						logElement.scrollTop = logElement.scrollHeight;
					};

					logToDOM('=== TELEGRAM WEBAPP ERROR ===');
					logToDOM('Error: ' + JSON.stringify(error, null, 2));
					logToDOM('===========================');

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
