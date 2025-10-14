import { useUserStore } from '@/entities/user/model/store';
import { UserProfile } from '@/entities/user/model/types';
import { registerAfterOnboarding } from '@/shared/lib/auth/registerAfterOnboarding';

// Функция для логирования в DOM
const logToDOM = (message: string) => {
	const logElement = document.getElementById('debug-log');
	if (logElement) {
		logElement.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
		logElement.scrollTop = logElement.scrollHeight;
	}
};

type Params = UserProfile & {
	serviceId: number;
	telegramId: number;
};

export const completeOnboarding = async (
	profile: Params
): Promise<{ userId: number }> => {
	try {
		const { telegram } = useUserStore.getState();

		if (!telegram) {
			throw new Error('Telegram пользователь не найден');
		}

		const registerData = await registerAfterOnboarding(profile);
		const userId = registerData.user_id || registerData.id;

		logToDOM('🎉 completeOnboarding завершен успешно, userId: ' + userId);
		return { userId: userId };
	} catch (error) {
		logToDOM('❌ Ошибка в completeOnboarding: ' + JSON.stringify(error));
		throw error;
	}
};
