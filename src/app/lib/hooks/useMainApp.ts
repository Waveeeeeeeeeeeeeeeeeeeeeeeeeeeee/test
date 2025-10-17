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
	const [debugLog, setDebugLog] = useState<string>('');
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

				console.log('=== BEFORE retrieveLaunchParams ===');
				console.log('About to call retrieveLaunchParams()...');
				console.log('=====================================');

				try {
					console.log('Calling retrieveLaunchParams...');

					throw new Error(
						'TEST ERROR: retrieveLaunchParams() artificially failed'
					);

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
					logToDOM(
						'retrieveLaunchParams() FAILED - this is why tgWebAppData is undefined!'
					);
					logToDOM('Error details: ' + JSON.stringify(error, null, 2));
					logToDOM(
						'Colleague gets undefined because retrieveLaunchParams() throws error'
					);
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

					if ('hash' in tgWebAppData && tgWebAppData.hash) {
						setUserHash(tgWebAppData.hash as string);
					}
					if ('query_id' in tgWebAppData && tgWebAppData.query_id) {
						setTelegramQueryId(tgWebAppData.query_id as string);
					}
					if ('auth_date' in tgWebAppData && tgWebAppData.auth_date) {
						let authTimestamp: number;

						if (typeof tgWebAppData.auth_date === 'number') {
							authTimestamp = tgWebAppData.auth_date;
						} else if (typeof tgWebAppData.auth_date === 'string') {
							authTimestamp = Math.floor(
								new Date(tgWebAppData.auth_date).getTime() / 1000
							);
						} else {
							authTimestamp = Math.floor(
								(tgWebAppData.auth_date as Date).getTime() / 1000
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
		isAuthChecking: false,
		debugLog
	};
};
