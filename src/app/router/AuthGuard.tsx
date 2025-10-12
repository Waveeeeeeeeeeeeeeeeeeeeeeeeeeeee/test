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

	// Если требуется завершение онбординга, но профиль не создан
	if (requireOnboarding && (!profile || !profile.user_id)) {
		return <Navigate to='/onboarding' replace />;
	}

	// Если пользователь авторизован и пытается попасть на онбординг
	if (
		user &&
		profile &&
		profile.user_id &&
		window.location.pathname === '/onboarding'
	) {
		return <Navigate to='/home' replace />;
	}

	return <>{children}</>;
};
