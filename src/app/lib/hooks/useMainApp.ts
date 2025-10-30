import {
  expandViewport,
  init,
  initDataUser,
  restoreInitData,
  retrieveLaunchParams,
  swipeBehavior } from
'@telegram-apps/sdk';
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
          tgWebAppData = result.tgWebAppData;
        } catch {
          const user = initDataUser();

          if (user) {
            tgWebAppData = { user };
            initDataString =
            (
            window as unknown as {
              Telegram?: {WebApp?: {initData?: string;};};
            }).
            Telegram?.WebApp?.initData || null;
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
  i18n]
  );

  return {
    showContent: isReady,
    shouldRedirectToOnboarding: false,
    isAuthChecking: false
  };
};