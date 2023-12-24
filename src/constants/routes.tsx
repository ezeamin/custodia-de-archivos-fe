import { AiFillHome } from 'react-icons/ai';

import { Route } from './interface';
import HomeView from '@/views/Home/HomeView';

export const routes: Route[] = [
  {
    id: 1000,
    title: 'Login',
    description: 'Login',
    path: '/auth',
    hidden: true,
    options: [],
    element: <div />,
    subpaths: [
      {
        id: 1001,
        title: 'Recuperar contraseña',
        description: 'Recuperar contraseña',
        path: '/auth/recover-password',
        options: [],
        subpaths: [],
        element: <div />,
      },
      {
        id: 1002,
        title: 'Cambiar contraseña',
        description: 'Cambiar contraseña',
        path: '/auth/reset-password',
        options: [],
        subpaths: [],
        element: <div />,
      },
    ],
  },
  {
    id: 2000,
    title: 'Inicio',
    icon: <AiFillHome />,
    description: 'Inicio',
    path: '/',
    options: [],
    subpaths: [],
    element: <HomeView />,
  },
];
