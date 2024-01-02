import { AiFillHome } from 'react-icons/ai';
import { IoNotifications, IoPeople, IoSettingsSharp } from 'react-icons/io5';

import type { Route } from '../interface';
import { paths } from './paths';
import AuthView from '@/views/Auth/AuthView';
import EmployeeListView from '@/views/Employees/EmployeeListView';
import HomeView from '@/views/Home/HomeView';
import NotificationsView from '@/views/Notifications/NotificationsView';
import SettingsView from '@/views/Settings/SettingsView';
import UsersView from '@/views/Users/UsersView';

export const routes: Route[] = [
  {
    id: 1000,
    title: 'Login',
    description: 'Login',
    path: paths.AUTH.LOGIN,
    hidden: true,
    element: <AuthView />,
    privateRoute: false,
    subpaths: [
      {
        id: 1001,
        title: 'Recuperar contraseña',
        description: 'Recuperar contraseña',
        path: paths.AUTH.RECOVER_PASS,
        subpaths: [],
        privateRoute: false,
        element: <AuthView />,
      },
      {
        id: 1002,
        title: 'Cambiar contraseña',
        description: 'Cambiar contraseña',
        path: paths.AUTH.RESET_PASS,
        subpaths: [],
        privateRoute: true,
        element: <AuthView />,
      },
    ],
  },
  {
    id: 2000,
    title: 'Inicio',
    icon: <AiFillHome />,
    description: 'Inicio',
    path: paths.HOME,
    subpaths: [],
    element: <HomeView />,
    privateRoute: true,
    hidden: true,
  },
  {
    id: 3000,
    title: 'Empleados',
    icon: <IoPeople />,
    description: 'Listado de empleados',
    path: paths.EMPLOYEES.MAIN,
    subpaths: [],
    privateRoute: true,
    element: <EmployeeListView />,
  },
  {
    id: 4000,
    title: 'Notificaciones',
    icon: <IoNotifications />,
    description: 'Centro de notificaciones',
    path: paths.NOTIFICATIONS.MAIN,
    subpaths: [],
    privateRoute: true,
    element: <NotificationsView />,
  },
  {
    id: 5000,
    title: 'Usuarios',
    icon: <IoPeople />,
    description: 'Listado de usuarios',
    path: paths.USERS.MAIN,
    subpaths: [],
    privateRoute: true,
    element: <UsersView />,
  },
  {
    id: 6000,
    title: 'Ajustes',
    icon: <IoSettingsSharp />,
    description: 'Ajustes',
    path: paths.SETTINGS.MAIN,
    subpaths: [],
    privateRoute: true,
    element: <SettingsView />,
  },
];
