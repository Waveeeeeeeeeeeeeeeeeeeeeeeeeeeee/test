import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';

import { useUserStore } from '@/entities/user/model/store';

interface AuthGuardProps {
	children: ReactNode;
	requireAuth?: boolean;
	requireOnboarding?: boolean;
}

export const AuthGuard: FC<AuthGuardProps> = ({
	children,
	requireAuth = false,
	requireOnboarding = false
}) => {
	const { user, profile } = useUserStore();

	// Если требуется аутентификация, но пользователь не авторизован
	if (requireAuth && !user) {
		return <Navigate to='/onboarding' replace />;
	}

	// Если требуется завершение онбординга, проверяем наличие основных данных профиля
	// user_id и profile_id не сохраняются - они берутся из токена автоматически
	const isProfileComplete =
		profile &&
		profile.nickname &&
		profile.age &&
		profile.isFirstFormValid &&
		profile.isSecondFormValid;

	if (requireOnboarding && !isProfileComplete) {
		return <Navigate to='/onboarding' replace />;
	}

	// Если профиль заполнен и пользователь пытается попасть на онбординг
	if (user && isProfileComplete && window.location.pathname === '/onboarding') {
		return <Navigate to='/home' replace />;
	}

	return <>{children}</>;
};
