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
				// Функция для логирования в DOM
				const logToDOM = (message: string) => {
					const logElement = document.getElementById('debug-log');
					if (logElement) {
						logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
						logElement.scrollTop = logElement.scrollHeight;
					}
				};

				logToDOM('🚀 useMainApp: Начало инициализации');
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
				} catch {
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
						} else {
							tgWebAppData = null;
						}
					} catch {
						tgWebAppData = null;
					}
				}

				if (tgWebAppData?.user) {
					// Функция для логирования в DOM
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
						// Преобразуем auth_date в timestamp (число)
						const authDate =
							typeof tgWebAppData.auth_date === 'number'
								? tgWebAppData.auth_date
								: new Date(tgWebAppData.auth_date).getTime() / 1000;

						logToDOM(
							'🔧 Преобразование auth_date: ' +
								JSON.stringify({
									original: tgWebAppData.auth_date,
									originalType: typeof tgWebAppData.auth_date,
									converted: authDate,
									convertedType: typeof authDate
								})
						);

						setTelegramAuthDate(authDate);
						logToDOM('✅ telegramAuthDate записан в стор: ' + authDate);
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
					}
				} else {
					// Функция для логирования в DOM
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
