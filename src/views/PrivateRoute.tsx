import { Navigate, useLocation } from 'react-router-dom';

import { useSession } from '@/stores/useSession';

import { paths } from '@/constants/routes/paths';

import { PrivateRouteProps } from './interface';

const PrivateRoute = (props: PrivateRouteProps) => {
  const { element, privateRoute } = props;

  const { isLoggedIn } = useSession();

  const location = useLocation();

  if (privateRoute && !isLoggedIn) {
    const redirectUrl = location.pathname + location.search;
    const loginUrl =
      location.pathname !== '/' // Avoid /auth?redirectTo=/
        ? `${paths.AUTH.LOGIN}?redirectTo=${redirectUrl}`
        : paths.AUTH.LOGIN;

    return <Navigate to={loginUrl} />;
  }

  if (!privateRoute && isLoggedIn) {
    const redirectUrl = new URLSearchParams(location.search).get('redirectTo');
    const path = redirectUrl ?? paths.HOME;

    return <Navigate to={path} />;
  }

  return element;
};
export default PrivateRoute;
