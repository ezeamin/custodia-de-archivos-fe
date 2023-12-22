import { AiFillHome } from 'react-icons/ai';

import { Route } from './interface';

export const routes: Route[] = [
  {
    id: 1000,
    title: 'Login',
    description: 'Login',
    path: '/auth',
    hidden: true,
    options: [],
    subpaths: [
      {
        id: 1001,
        title: 'Recuperar contraseña',
        description: 'Recuperar contraseña',
        path: '/auth/recover-password',
        options: [],
        subpaths: [],
      },
      {
        id: 1002,
        title: 'Cambiar contraseña',
        description: 'Cambiar contraseña',
        path: '/auth/reset-password',
        options: [],
        subpaths: [],
      },
      {
        id: 1001,
        title: 'Recuperar contraseña',
        description: 'Recuperar contraseña',
        path: '/auth/recover-password',
        options: [],
        subpaths: [],
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
  },
];
