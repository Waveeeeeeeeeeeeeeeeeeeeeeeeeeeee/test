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
	const { setTelegramUser, setUserHash, setTelegramQueryId } = useUserStore();
	const { i18n } = useTranslation();

	useEffect(() => {
		const initApp = async () => {
			try {
				init();
				restoreInitData();
				expandViewport();
				swipeBehavior.mount();
				swipeBehavior.disableVertical();

				let tgWebAppData;
				try {
					const result = await retrieveLaunchParams();
					tgWebAppData = result.tgWebAppData;
				} catch (error: any) {
					try {
						const user = initDataUser();
						if (user) {
							tgWebAppData = { user };
						} else {
							tgWebAppData = null;
						}
					} catch (altError: any) {
						tgWebAppData = null;
					}
				}

				if (tgWebAppData?.user) {
					alert('tgWebAppData: ' + JSON.stringify(tgWebAppData, null, 2));
					setTelegramUser(tgWebAppData.user);
					setUserHash(tgWebAppData.hash);
					setTelegramQueryId(tgWebAppData.query_id);
				}

				const languageCodeFromLs = localStorage.getItem('language_code');
				if (languageCodeFromLs) {
					i18n.changeLanguage(languageCodeFromLs);
				}

				setIsReady(true);
			} catch (error: any) {
				setIsReady(true);
			}
		};

		initApp();
	}, [setTelegramUser, setUserHash, setTelegramQueryId, i18n]);

	return {
		showContent: isReady
	};
};
