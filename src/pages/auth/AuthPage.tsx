import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router';

import AuthLoading from '@/app/ui/authLoading/AuthLoading';
import { useUserStore } from '@/entities/user/model/store';
import { reqLogin } from '@/shared/lib/auth/reqLogin';

const AuthPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldGoToOnboarding, setShouldGoToOnboarding] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        if (!user) {
          setShouldGoToOnboarding(true);
          return;
        }

        const initData = {
          auth_date: Math.floor(Date.now() / 1000),
          query_id: 'test_query_id',
          user: JSON.stringify(user),
          hash: 'test_hash'
        };

        await reqLogin(initData);
      } catch (error: unknown) {
        setShouldGoToOnboarding(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user]);

  if (isLoading) {
    return <AuthLoading />;
  }

  if (shouldGoToOnboarding) {
    return <Navigate to='/onboarding' replace />;
  }

  return <Navigate to='/home' replace />;
};

export default AuthPage;