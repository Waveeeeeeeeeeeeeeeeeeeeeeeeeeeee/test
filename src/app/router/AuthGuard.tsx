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


  if (requireAuth && !user) {
    return <Navigate to='/onboarding' replace />;
  }



  const isProfileComplete =
  profile &&
  profile.nickname &&
  profile.age &&
  profile.isFirstFormValid &&
  profile.isSecondFormValid;

  if (requireOnboarding && !isProfileComplete) {
    return <Navigate to='/onboarding' replace />;
  }


  if (user && isProfileComplete && window.location.pathname === '/onboarding') {
    return <Navigate to='/home' replace />;
  }

  return <>{children}</>;
};