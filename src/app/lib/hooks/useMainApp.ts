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
		const initApp = async () => {
			try {
				const logToDOM = (message: string) => {
					const logElement = document.getElementById('debug-log');
					if (logElement) {
						logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
						logElement.scrollTop = logElement.scrollHeight;
					}
				};

				alert(
					'🚀 useMainApp: Начало инициализации - ' +
						new Date().toLocaleTimeString()
				);
				alert('🔧 Проверка логирования: ' + new Date().toISOString());
				logToDOM('🚀 useMainApp: Начало инициализации');
				logToDOM('🔧 Проверка логирования в DOM');
				init();
				restoreInitData();
				expandViewport();
				swipeBehavior.mount();
				swipeBehavior.disableVertical();

				let tgWebAppData;
				let initDataString;
				try {
					const result = await retrieveLaunchParams();
					tgWebAppData = result.tgWebAppData;
					initDataString = result.initData;

					logToDOM(
						'🔍 retrieveLaunchParams result: ' + JSON.stringify(result, null, 2)
					);
					logToDOM('🔍 tgWebAppData: ' + JSON.stringify(tgWebAppData, null, 2));
					alert(
						'✅ Данные получены от Telegram: ' +
							JSON.stringify(tgWebAppData, null, 2)
					);
				} catch (error) {
					alert('❌ Ошибка retrieveLaunchParams: ' + (error as Error).message);
					try {
						const user = initDataUser();
						if (user) {
							tgWebAppData = { user };
							initDataString =
								(
									window as unknown as {
										Telegram?: { WebApp?: { initData?: string } };
									}
								).Telegram?.WebApp?.initData || null;
							alert('⚠️ Fallback: данные получены через initDataUser');
						} else {
							tgWebAppData = null;
							alert('❌ Fallback: данные не найдены');
						}
					} catch (fallbackError) {
						tgWebAppData = null;
						alert(
							'❌ Fallback тоже не сработал: ' +
								(fallbackError as Error).message
						);
					}
				}

				if (tgWebAppData?.user) {
					const logToDOM = (message: string) => {
						const logElement = document.getElementById('debug-log');
						if (logElement) {
							logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
							logElement.scrollTop = logElement.scrollHeight;
						}
					};

					logToDOM('🔍 useMainApp: tgWebAppData получен');
					logToDOM('📊 tgWebAppData: ' + JSON.stringify(tgWebAppData, null, 2));
					logToDOM('📅 tgWebAppData.auth_date: ' + tgWebAppData.auth_date);
					logToDOM(
						'📅 tgWebAppData.auth_date type: ' + typeof tgWebAppData.auth_date
					);

					setTelegramUser(tgWebAppData.user);
					if (tgWebAppData.hash) {
						setUserHash(tgWebAppData.hash);
						logToDOM('✅ userHash записан: ' + tgWebAppData.hash);
					}
					if (tgWebAppData.query_id) {
						setTelegramQueryId(tgWebAppData.query_id);
						logToDOM('✅ telegramQueryId записан: ' + tgWebAppData.query_id);
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

						logToDOM(
							'🔧 Auth_date conversion: ' +
								JSON.stringify({
									original: tgWebAppData.auth_date,
									originalType: typeof tgWebAppData.auth_date,
									timestamp: authTimestamp,
									humanReadable: new Date(authTimestamp * 1000).toISOString()
								})
						);

						setTelegramAuthDate(authTimestamp);
						logToDOM('✅ telegramAuthDate записан в стор: ' + authTimestamp);
					} else {
						logToDOM('❌ tgWebAppData.auth_date отсутствует!');
					}
					if (initDataString && typeof initDataString === 'string') {
						setTelegramInitData(initDataString);
						logToDOM(
							'✅ telegramInitData записан: ' +
								initDataString.substring(0, 50) +
								'...'
						);
						logToDOM('🔍 Full initDataString: ' + initDataString);
					}
				} else {
					const logToDOM = (message: string) => {
						const logElement = document.getElementById('debug-log');
						if (logElement) {
							logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
							logElement.scrollTop = logElement.scrollHeight;
						}
					};
					logToDOM('❌ useMainApp: tgWebAppData.user отсутствует!');
					logToDOM('📊 tgWebAppData: ' + JSON.stringify(tgWebAppData, null, 2));
				}

				const languageCodeFromLs = localStorage.getItem('language_code');
				if (languageCodeFromLs) {
					i18n.changeLanguage(languageCodeFromLs);
				}

				setIsReady(true);
			} catch {
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
		showContent: isReady
	};
};
