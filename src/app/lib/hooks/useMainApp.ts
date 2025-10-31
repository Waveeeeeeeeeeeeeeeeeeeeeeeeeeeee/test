import {
	expandViewport,
	init,
	restoreInitData,
	swipeBehavior
} from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '@/entities/user/model/store';
import { TelegramUser } from '@/entities/user/model/types';

export const useMainApp = () => {
	const [isReady, setIsReady] = useState(false);
	const {
		setTelegramUser,
		setUserHash,
		setTelegramQueryId,
		setTelegramInitData,
		setTelegramAuthDate,
		setTelegramSignature
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
			} catch (e) {
				console.debug('Telegram SDK init error (running outside Telegram):', e);
			}

			let initDataString: string | null = null;

			const debugLog = (label: string, payload: unknown) => {
				try {
					let el = document.getElementById('debug-log');
					if (!el) {
						el = document.createElement('div');
						el.id = 'debug-log';
						el.setAttribute(
							'style',
							[
								'position: fixed',
								'top: 0',
								'left: 0',
								'width: 100vw',
								'height: 40vh',
								'background-color: rgba(0,0,0,0.9)',
								'color: white',
								'font-size: 14px',
								'padding: 20px',
								'overflow: auto',
								'z-index: 9999',
								'font-family: monospace'
							].join(';')
						);
						const titleDiv = document.createElement('div');
						titleDiv.setAttribute(
							'style',
							'font-size: 18px; font-weight: bold; margin-bottom: 10px'
						);
						titleDiv.textContent = 'Debug Log:';
						el.appendChild(titleDiv);
						document.body.appendChild(el);
					}
					const block = document.createElement('div');
					block.style.marginBottom = '6px';
					const title = document.createElement('div');
					title.style.fontWeight = 'bold';
					title.textContent = label;
					const pre = document.createElement('pre');
					pre.style.whiteSpace = 'pre-wrap';
					pre.style.wordBreak = 'break-word';
					pre.textContent =
						typeof payload === 'string'
							? payload
							: JSON.stringify(payload, null, 2);
					block.appendChild(title);
					block.appendChild(pre);
					el.appendChild(block);
				} catch (e) {
					console.debug('debug-log error', e);
				}
			};

			const urlParams = new URLSearchParams(window.location.search);
			const allUrlParams: Record<string, string> = {};
			urlParams.forEach((value, key) => {
				allUrlParams[key] = value;
			});
			debugLog('Все URL параметры', allUrlParams);
			console.log('Все URL параметры:', allUrlParams);

			const initDataFromUrl =
				urlParams.get('initData') || urlParams.get('initdData');

			if (initDataFromUrl) {
				debugLog('initData из URL параметра', initDataFromUrl);
				console.log('initData из URL параметра:', initDataFromUrl);

				const parseInitDataFromUrl = (raw: string) => {
					try {
						if (raw.startsWith('{')) {
							return JSON.parse(raw);
						}
						const params = new URLSearchParams(raw);
						const parsed: Record<string, unknown> = {};
						for (const [key, value] of params.entries()) {
							if (key === 'user') {
								parsed[key] = decodeURIComponent(value);
							} else if (key === 'auth_date') {
								const num = Number(value);
								parsed[key] = Number.isFinite(num) ? num : value;
							} else {
								parsed[key] = decodeURIComponent(value);
							}
						}
						return parsed;
					} catch {
						return null;
					}
				};

				const parsedUrlData = parseInitDataFromUrl(initDataFromUrl);
				if (parsedUrlData) {
					initDataString = initDataFromUrl;
					debugLog('initData из URL (parsed)', parsedUrlData);

					let userData = parsedUrlData.user;
					if (typeof userData === 'string') {
						try {
							userData = JSON.parse(userData);
						} catch {
							console.warn('Не удалось распарсить user из URL как JSON');
						}
					}

					if (userData && typeof userData === 'object') {
						setTelegramUser(userData as TelegramUser);
					}
					if (parsedUrlData.query_id) {
						setTelegramQueryId(String(parsedUrlData.query_id));
					}
					if (parsedUrlData.auth_date) {
						let authTimestamp: number;
						if (typeof parsedUrlData.auth_date === 'number') {
							authTimestamp = parsedUrlData.auth_date;
						} else if (typeof parsedUrlData.auth_date === 'string') {
							const num = Number(parsedUrlData.auth_date);
							authTimestamp =
								Number.isFinite(num) && num > 0
									? num
									: Math.floor(
											new Date(parsedUrlData.auth_date).getTime() / 1000
										);
						} else {
							authTimestamp = Math.floor(
								(parsedUrlData.auth_date as Date).getTime() / 1000
							);
						}
						setTelegramAuthDate(authTimestamp);
					}
					if (parsedUrlData.hash) {
						setUserHash(String(parsedUrlData.hash));
					}
					if (parsedUrlData.signature) {
						setTelegramSignature(String(parsedUrlData.signature));
					}
				}
			} else {
				console.warn('initData не найден в URL параметрах');
				debugLog(
					'initData не найден',
					'Проверьте URL параметры initData или initdData'
				);
			}

			if (initDataString && typeof initDataString === 'string') {
				setTelegramInitData(initDataString);
				debugLog('X-Telegram-Init-Data (final)', initDataString);
			}

			const languageCodeFromLs = localStorage.getItem('language_code');
			if (languageCodeFromLs) {
				i18n.changeLanguage(languageCodeFromLs);
			}

			setIsReady(true);
		};

		initApp();
	}, [
		setTelegramUser,
		setUserHash,
		setTelegramQueryId,
		setTelegramInitData,
		setTelegramAuthDate,
		setTelegramSignature,
		i18n
	]);

	return {
		showContent: isReady,
		shouldRedirectToOnboarding: false,
		isAuthChecking: false
	};
};
