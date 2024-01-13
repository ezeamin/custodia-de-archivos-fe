import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getRefreshTokenFn } from '@/api/api-calls/auth';

import { useSession } from '@/stores/useSession';

import LoadingPage from '@/components/Loading/LoadingPage';

import { router } from '@/utilities/router';

// Useful for reset password view
const tokenInUrl = new URLSearchParams(window.location.search).get('token');

const TryToLoginView = () => {
  const { isLoggedIn, login } = useSession();
  const [shouldShowRouter, setShouldShowRouter] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['login', !isLoggedIn && !tokenInUrl],
    queryFn: getRefreshTokenFn,
    enabled: !isLoggedIn && !tokenInUrl,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (tokenInUrl && !isLoggedIn) {
      login(tokenInUrl);
      setShouldShowRouter(true);
    }
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
