import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getRefreshTokenFn } from '@/api/api-calls/auth';

import { useSession } from '@/stores/useSession';

// import LoadingPage from '@/components/Loading/LoadingPage';
import { router } from '@/utilities/router';

// Useful for reset password view
const tokenInUrl = new URLSearchParams(window.location.search).get('token');

const TryToLoginView = () => {
  const { isLoggedIn, login } = useSession();

  const { data /* , isLoading */ } = useQuery({
    queryKey: ['login'],
    queryFn: getRefreshTokenFn,
    enabled: !isLoggedIn && !tokenInUrl,
  });

  useEffect(() => {
    if (tokenInUrl && !isLoggedIn) {
      login(tokenInUrl);
    }
    if (data?.data?.token && !isLoggedIn) {
      login(data.data.token);
    }
  }, [data, login, isLoggedIn]);

  //   if (isError) {
  //     return <ErrorPage />;
  //   }

  //   if (isSuccess && data.data && !('token' in data.data)) {
  //     return <Navigate to={paths.AUTH.LOGIN} />;
  //   }

  //   ! Only uncomment this block of code
  //   if (!isLoggedIn && isLoading) {
  //     return (
  //       <section className="w-screen h-[100dvh] flex flex-col justify-center items-center">
  //         <LoadingPage />
  //       </section>
  //     );
  //   }

  return <RouterProvider router={router} />;
};
export default TryToLoginView;
