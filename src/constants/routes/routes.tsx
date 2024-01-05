import { AiFillHome } from 'react-icons/ai';
import { IoNotifications, IoPeople, IoSettingsSharp } from 'react-icons/io5';

import { paths } from './paths';

import AuthView from '@/views/Auth/AuthView';
import CreateEmployeeView from '@/views/Employees/CreateEmployeeView';
import EmployeeDetailsView from '@/views/Employees/EmployeeDetailsView';
import EmployeeListView from '@/views/Employees/EmployeeListView';
import HomeView from '@/views/Home/HomeView';
import CreateNotificationView from '@/views/Notifications/CreateNotificationView';
import NotificationDetailView from '@/views/Notifications/NotificationDetailView';
import NotificationsHistoryView from '@/views/Notifications/NotificationsHistoryView';
import NotificationsTypesView from '@/views/Notifications/NotificationsTypesView';
import NotificationsView from '@/views/Notifications/NotificationsView';
import SettingsView from '@/views/Settings/SettingsView';
import UsersView from '@/views/Users/UsersView';

import { flattenRoutes } from '@/utilities/utils';

import type { Route } from '../interface';

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
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 1002,
        title: 'Cambiar contraseña',
        description: 'Cambiar contraseña',
        path: paths.AUTH.RESET_PASS,
        subpaths: [],
        privateRoute: true,
        element: <AuthView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
    ],
    allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
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
    allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
  },
  {
    id: 3000,
    title: 'Empleados',
    icon: <IoPeople />,
    description: 'Listado de empleados',
    path: paths.EMPLOYEES.MAIN,
    subpaths: [
      {
        id: 3001,
        title: 'Crear empleado',
        description: 'Crear empleado',
        path: paths.EMPLOYEES.CREATE,
        subpaths: [],
        privateRoute: true,
        element: <CreateEmployeeView />,
        allowedRoles: ['ADMIN', 'READ_ONLY'],
      },
      {
        id: 3002,
        title: 'Detalle empleado',
        description: 'Detalle empleado',
        path: paths.EMPLOYEES.EMPLOYEE_DETAILS,
        subpaths: [],
        privateRoute: true,
        element: <EmployeeDetailsView />,
        allowedRoles: ['ADMIN', 'READ_ONLY'],
      },
    ],
    privateRoute: true,
    element: <EmployeeListView />,
    allowedRoles: ['ADMIN', 'READ_ONLY'],
  },
  {
    id: 4000,
    title: 'Notificaciones',
    icon: <IoNotifications />,
    description: 'Centro de notificaciones',
    path: paths.NOTIFICATIONS.MAIN,
    subpaths: [
      {
        id: 4001,
        title: 'Crear notificación',
        description: 'Crear notificación',
        path: paths.NOTIFICATIONS.CREATE,
        subpaths: [],
        privateRoute: true,
        element: <CreateNotificationView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 4002,
        title: 'Historial de Notificaciones',
        description: 'Historial notificaciones',
        path: paths.NOTIFICATIONS.HISTORY,
        subpaths: [],
        privateRoute: true,
        element: <NotificationsHistoryView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 4003,
        title: 'Administrar tipos',
        description: 'Administrar tipos',
        path: paths.NOTIFICATIONS.ADMIN_TYPES,
        subpaths: [],
        privateRoute: true,
        element: <NotificationsTypesView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 4004,
        title: 'Detalle Notificación',
        description: 'Detalle Notificación',
        path: paths.NOTIFICATIONS.DETAILS,
        subpaths: [],
        privateRoute: true,
        element: <NotificationDetailView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
    ],
    privateRoute: true,
    element: <NotificationsView />,
    allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
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
    allowedRoles: ['ADMIN', 'READ_ONLY'],
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
    allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
  },
];

export const flattedRoutes = flattenRoutes(routes);

export const adminRoutes = routes.filter((route) =>
  route.allowedRoles.includes('ADMIN')
);

export const employeeRoutes = routes.filter((route) =>
  route.allowedRoles.includes('EMPLOYEE')
);

export const readOnlyRoutes = routes.filter((route) =>
  route.allowedRoles.includes('READ_ONLY')
);
