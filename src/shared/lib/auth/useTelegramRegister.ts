import { useEffect } from 'react';

import { reqRegister } from './reqRegister';
import { useUserStore } from '@/entities/user/model/store';

export const useTelegramRegister = () => {
  useEffect(() => {
    const register = async () => {
      try {
        const { telegram } = useUserStore.getState();

        if (!telegram) {
          throw new Error('Telegram data not found');
        }

        const userData = {
          telegram_id: telegram.id
        };

        await reqRegister(userData);
      } catch (e: unknown) {
        console.debug('useTelegramRegister error:', e);
      }
    };

    register();
  }, []);
};