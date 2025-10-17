import { useUserStore } from '@/entities/user/model/store';
import { UserProfile } from '@/entities/user/model/types';
import { registerAfterOnboarding } from '@/shared/lib/auth/registerAfterOnboarding';

type Params = UserProfile & {
	serviceId: number;
	telegramId: number;
};

export const completeOnboarding = async (
	profile: Params
): Promise<{ userId: number; profileId: number }> => {
	try {
		const { telegram } = useUserStore.getState();

		if (!telegram) {
			throw new Error('Telegram пользователь не найден');
		}

		const registerData = await registerAfterOnboarding(profile);
		const userId = registerData.user_id || registerData.id;

		return { userId: userId, profileId: userId };
	} catch (error) {
		console.error('completeOnboarding error:', error);
		throw error;
	}
};
