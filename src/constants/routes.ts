import { Route } from './interface';

export const routes: Route[] = [
  {
    id: 1000,
    title: 'Login',
    description: 'Login page',
    path: '/auth',
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
];
