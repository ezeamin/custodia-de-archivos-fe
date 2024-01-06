import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/views/Layout/Layout';
import PrivateRoute from '@/views/PrivateRoute';

import { flattedRoutes } from '@/constants/routes/routes';

const routes = flattedRoutes.map((route) => ({
  element: (
    <PrivateRoute
      allowedRoles={route.allowedRoles}
      element={route.element}
      privateRoute={route.privateRoute}
    />
  ),
  path: route.path,
}));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routes,
  },
]);
