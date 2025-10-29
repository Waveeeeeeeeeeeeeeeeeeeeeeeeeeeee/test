import { create } from 'zustand';

import { completeOnboarding } from '../lib/completeOnboarding';

import { UserProfile } from '@/entities/user/model/types';

type State = {
	isLoading: boolean;
	error: string | null;
	isSuccess: boolean;
	submit: (
		profile: UserProfile & {
			telegramId: number;
			pushToken: string;
			serviceId: number;
		}
	) => Promise<void>;
};

export const useOnboarding = create<State>(set => ({
	isLoading: false,
	error: null,
	isSuccess: false,
	submit: async profile => {
		set({ isLoading: true, error: null });
		try {
			await completeOnboarding(profile);
			set({
				isLoading: false,
				isSuccess: true
			});
		} catch (e: unknown) {
			set({
				isLoading: false,
				error: e instanceof Error ? e.message : 'Ошибка при онбординге'
			});
		}
	}
}));
