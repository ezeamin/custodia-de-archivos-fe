import { createBrowserRouter } from 'react-router-dom';

import Error404 from '@/components/Error/Error404';
import ErrorPage from '@/components/Error/ErrorPage';
import AuthLayout from '@/views/Layout/AuthLayout';
import Layout from '@/views/Layout/Layout';
import PrivateRoute from '@/views/PrivateRoute';

import { flattedRoutes } from '@/constants/routes/routes';

const internRoutes = flattedRoutes
  .filter((route) => route.id > 1999) // remove login
  .map((route) => ({
    element: (
      <PrivateRoute
        allowedRoles={route.allowedRoles}
        element={route.element}
        privateRoute={route.privateRoute}
      />
    ),
    path: route.path,
  }));

const authRoutes = flattedRoutes
  .filter((route) => route.id <= 1999)
  .map((route) => ({
    element: (
      <PrivateRoute
        allowedRoles={route.allowedRoles}
        element={route.element}
        privateRoute={route.privateRoute}
      />
    ),
    path: route.path,
  }));

internRoutes.push({
  element: <Error404 />,
  path: '*',
});
authRoutes.push({
  element: <Error404 />,
  path: '*',
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: internRoutes,
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes,
    errorElement: <ErrorPage />,
  },
]);
