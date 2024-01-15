import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getRefreshTokenFn } from '@/api/api-calls/auth';

import { useSession } from '@/stores/useSession';

import LoadingPage from '@/components/Loading/LoadingPage';

import { router } from '@/utilities/router';

const TryToLoginView = () => {
  const { isLoggedIn, login } = useSession();
  const [shouldShowRouter, setShouldShowRouter] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['login', !isLoggedIn],
    queryFn: getRefreshTokenFn,
    enabled: !isLoggedIn,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.data?.token && !isLoggedIn) {
      login(data.data.token);
      setShouldShowRouter(true);
    }
    if (error) {
      setShouldShowRouter(true);
    }
  }, [data, login, isLoggedIn, error]);

  if (!isLoggedIn && isLoading) {
    return (
      <section className="flex h-[100dvh] w-screen flex-col items-center justify-center">
        <LoadingPage />
      </section>
    );
  }

  if (shouldShowRouter) {
    return <RouterProvider router={router} />;
  }

  return null;
};
export default TryToLoginView;
