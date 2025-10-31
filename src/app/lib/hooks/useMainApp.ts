import {
	expandViewport,
	init,
	restoreInitData,
	retrieveLaunchParams,
	swipeBehavior
} from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserStore } from '@/entities/user/model/store';

export const useMainApp = () => {
	const [isReady, setIsReady] = useState(false);
	const [debugLog, setDebugLog] = useState<string>('');
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

				console.log('=== BEFORE retrieveLaunchParams ===');
				console.log('=====================================');

				try {
					console.log('Calling retrieveLaunchParams...');

					const result = retrieveLaunchParams();
					console.log('retrieveLaunchParams SUCCESS!');

					console.log('=== TELEGRAM WEBAPP DATA ===');
					console.log('Full result:', JSON.stringify(result, null, 2));
					console.log('=== TGWEBAPPDATA ANALYSIS ===');
					console.log(
						'result.tgWebAppData:',
						JSON.stringify(result.tgWebAppData, null, 2)
					);
					console.log('result.tgWebAppData type:', typeof result.tgWebAppData);
					console.log(
						'result.tgWebAppData === undefined:',
						result.tgWebAppData === undefined
					);
					console.log(
						'result.tgWebAppData === null:',
						result.tgWebAppData === null
					);
					console.log(
						'result.tgWebAppData keys:',
						result.tgWebAppData
							? Object.keys(result.tgWebAppData as any)
							: 'NO KEYS'
					);
					console.log('result.tgWebAppData.user:', result.tgWebAppData?.user);
					console.log(
						'result.tgWebAppData.user type:',
						typeof result.tgWebAppData?.user
					);
					console.log('result.tgWebAppData.hash:', result.tgWebAppData?.hash);
					console.log(
						'result.tgWebAppData.query_id:',
						result.tgWebAppData?.query_id
					);
					console.log(
						'result.tgWebAppData.auth_date:',
						result.tgWebAppData?.auth_date
					);
					console.log(
						'result.tgWebAppData.signature:',
						result.tgWebAppData?.signature
					);
					console.log('===========================');

					const logToDOM = (message: string) => {
						const timestamp = new Date().toLocaleTimeString();
						const logMessage = `${timestamp}: ${message}`;
						setDebugLog(prev => prev + logMessage + '\n');
					};

					logToDOM('=== TELEGRAM WEBAPP DATA ===');
					logToDOM('=== TGWEBAPPDATA ANALYSIS ===');
					logToDOM(
						'tgWebAppData: ' + JSON.stringify(result.tgWebAppData, null, 2)
					);
					logToDOM('tgWebAppData type: ' + typeof result.tgWebAppData);
					logToDOM(
						'tgWebAppData === undefined: ' + (result.tgWebAppData === undefined)
					);
					logToDOM('tgWebAppData === null: ' + (result.tgWebAppData === null));
					logToDOM(
						'tgWebAppData keys: ' +
							(result.tgWebAppData
								? Object.keys(result.tgWebAppData as any).join(', ')
								: 'NO KEYS')
					);
					logToDOM(
						'tgWebAppData.user: ' +
							JSON.stringify(result.tgWebAppData?.user, null, 2)
					);
					logToDOM(
						'tgWebAppData.user type: ' + typeof result.tgWebAppData?.user
					);
					logToDOM('tgWebAppData.hash: ' + result.tgWebAppData?.hash);
					logToDOM('tgWebAppData.query_id: ' + result.tgWebAppData?.query_id);
					logToDOM('tgWebAppData.auth_date: ' + result.tgWebAppData?.auth_date);
					logToDOM('tgWebAppData.signature: ' + result.tgWebAppData?.signature);
					logToDOM('===========================');

					tgWebAppData = result.tgWebAppData;
				} catch (error) {
					console.error('=== retrieveLaunchParams FAILED ===');
					console.error('Error type:', typeof error);
					console.error('Error name:', (error as Error)?.name);
					console.error('Error message:', (error as Error)?.message);
					console.error('Error stack:', (error as Error)?.stack);
					console.error('Full error:', JSON.stringify(error, null, 2));

					console.log('=== DIAGNOSTIC INFO ===');
					console.log('User Agent:', navigator.userAgent);
					console.log('URL:', window.location.href);
					console.log('Referrer:', document.referrer);
					console.log('========================');

					const logToDOM = (message: string) => {
						const timestamp = new Date().toLocaleTimeString();
						const logMessage = `${timestamp}: ${message}`;
						setDebugLog(prev => prev + logMessage + '\n');
					};

					logToDOM('=== TELEGRAM WEBAPP ERROR ===');
					logToDOM('Error type: ' + typeof error);
					logToDOM('Error name: ' + ((error as Error)?.name || 'unknown'));
					logToDOM(
						'Error message: ' + ((error as Error)?.message || 'no message')
					);
					logToDOM('User Agent: ' + navigator.userAgent);
					logToDOM('URL: ' + window.location.href);
					logToDOM('Referrer: ' + document.referrer);
					logToDOM('=== TGWEBAPPDATA IN ERROR ===');
					logToDOM('retrieveLaunchParams() FAILED ');
					logToDOM('Error details: ' + JSON.stringify(error, null, 2));

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

				if (tgWebAppData?.user) {
					setTelegramUser(tgWebAppData.user);

					if ('hash' in tgWebAppData && tgWebAppData.hash) {
						setUserHash(tgWebAppData.hash as string);
					}
					if ('query_id' in tgWebAppData && tgWebAppData.query_id) {
						setTelegramQueryId(tgWebAppData.query_id as string);
					}
					if ('auth_date' in tgWebAppData && tgWebAppData.auth_date) {
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
								(tgWebAppData.auth_date as Date).getTime() / 1000
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

				setIsReady(true);
			} catch (error) {
				console.error('=== useMainApp initialization error ===');
				console.error('Error type:', typeof error);
				console.error('Error name:', (error as Error)?.name);
				console.error('Error message:', (error as Error)?.message);
				console.error('Error stack:', (error as Error)?.stack);
				console.error('Full error:', JSON.stringify(error, null, 2));
				console.error('===============================');

				const logToDOM = (message: string) => {
					const timestamp = new Date().toLocaleTimeString();
					const logMessage = `${timestamp}: ${message}`;
					setDebugLog(prev => prev + logMessage + '\n');
				};

				logToDOM('=== useMainApp initialization error ===');
				logToDOM('Error type: ' + typeof error);
				logToDOM('Error name: ' + ((error as Error)?.name || 'unknown'));
				logToDOM(
					'Error message: ' + ((error as Error)?.message || 'no message')
				);
				logToDOM('Error stack: ' + ((error as Error)?.stack || 'no stack'));
				logToDOM('Full error: ' + JSON.stringify(error, null, 2));
				logToDOM('===============================');

				setIsReady(true);
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
		isAuthChecking: false,
		debugLog
	};
};
