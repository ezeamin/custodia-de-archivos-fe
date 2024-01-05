import { Navigate, useLocation } from 'react-router-dom';

import { toast } from 'sonner';

import { useSession } from '@/stores/useSession';

import { paths } from '@/constants/routes/paths';

import { PrivateRouteProps } from './interface';

const PrivateRoute = (props: PrivateRouteProps) => {
  const { element, privateRoute, allowedRoles } = props;

  const { user, isLoggedIn } = useSession();

  const location = useLocation();

  // Logged in but doesn't have rights to be in route
  if (isLoggedIn && user && !allowedRoles.includes(user.role)) {
    toast.warning('No tiene permisos para acceder a esta ruta');
    return <Navigate to={paths.HOME} />;
  }

  // Not logged in but trying to access private route
  if (privateRoute && !isLoggedIn) {
    const redirectUrl = location.pathname + location.search;
    const loginUrl =
      location.pathname !== '/' // Avoid /auth?redirectTo=/
        ? `${paths.AUTH.LOGIN}?redirectTo=${redirectUrl}`
        : paths.AUTH.LOGIN;

    return <Navigate to={loginUrl} />;
  }

  // Logged in but trying to access public route (like login)
  if (!privateRoute && isLoggedIn) {
    const redirectUrl = new URLSearchParams(location.search).get('redirectTo');
    const path = redirectUrl ?? paths.HOME;

    return <Navigate to={path} />;
  }

  // Whatever other case
  return element;
};
export default PrivateRoute;
