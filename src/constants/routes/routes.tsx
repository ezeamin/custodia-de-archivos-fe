import { AiFillHome } from 'react-icons/ai';
import {
  IoList,
  IoNotifications,
  IoPeople,
  IoSettingsSharp,
} from 'react-icons/io5';

import { paths } from './paths';

import LoginView from '@/views/Auth/LoginView';
import RecoverPasswordView from '@/views/Auth/RecoverPasswordView';
import ResetPasswordView from '@/views/Auth/ResetPasswordView';
import CreateEmployeeView from '@/views/Employees/CreateEmployeeView';
import EditEmployeeView from '@/views/Employees/EditEmployeeView';
import EmployeeDetailsView from '@/views/Employees/EmployeeDetailsView';
import EmployeeListView from '@/views/Employees/EmployeeListView';
import HomeView from '@/views/Home/HomeView';
import CreateNotificationView from '@/views/Notifications/CreateNotificationView';
import NotificationDetailView from '@/views/Notifications/NotificationDetailView';
import NotificationsReadListView from '@/views/Notifications/NotificationsReadListView';
import NotificationsSentListView from '@/views/Notifications/NotificationsSentListView';
import NotificationsView from '@/views/Notifications/NotificationsView';
import ChangePasswordView from '@/views/Settings/ChangePasswordView';
import CreateAdminView from '@/views/Settings/CreateAdminView';
import CreateReadOnlyView from '@/views/Settings/CreateReadOnlyView';
import LoginLogsView from '@/views/Settings/LoginLogsView';
import RemoveAdminView from '@/views/Settings/RemoveAdminView';
import RemoveReadOnlyView from '@/views/Settings/RemoveReadOnlyView';
import SettingsView from '@/views/Settings/SettingsView';
import LicensesTypesView from '@/views/TypesList/LicensesTypesView';
import NotificationsTypesView from '@/views/TypesList/NotificationsTypesView';
import TrainingsTypesView from '@/views/TypesList/TrainingsTypesView';
import TypesListView from '@/views/TypesList/TypesListView';

import { flattenRoutes } from '@/utilities/utils';

import type { Route } from '../interface';

export const routes: Route[] = [
  {
    id: 1000,
    title: 'Login',
    description: 'Login',
    path: paths.AUTH.LOGIN,
    hidden: true,
    element: <LoginView />,
    privateRoute: false,
    subpaths: [
      {
        id: 1001,
        title: 'Recuperar contraseña',
        description: 'Recuperar contraseña',
        path: paths.AUTH.RECOVER_PASS,
        subpaths: [],
        privateRoute: false,
        element: <RecoverPasswordView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 1002,
        title: 'Cambiar contraseña',
        description: 'Cambiar contraseña',
        path: paths.AUTH.RESET_PASS,
        subpaths: [],
        privateRoute: false,
        element: <ResetPasswordView />,
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
      {
        id: 3003,
        title: 'Editar empleado',
        description: 'Editar empleado',
        path: paths.EMPLOYEES.EMPLOYEE_DETAILS_EDIT,
        subpaths: [],
        privateRoute: true,
        element: <EditEmployeeView />,
        allowedRoles: ['ADMIN'],
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
        path: paths.NOTIFICATIONS.READ,
        subpaths: [],
        privateRoute: true,
        element: <NotificationsReadListView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 4003,
        title: 'Detalle Notificación',
        description: 'Detalle Notificación',
        path: paths.NOTIFICATIONS.DETAILS,
        subpaths: [],
        privateRoute: true,
        element: <NotificationDetailView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 4004,
        title: 'Enviadas',
        description: 'Notificaciones enviadas',
        path: paths.NOTIFICATIONS.SENT,
        subpaths: [],
        privateRoute: true,
        element: <NotificationsSentListView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 4005,
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
    title: 'Tipos',
    icon: <IoList />,
    description: 'Listado de tipos',
    path: paths.TYPES_LIST.MAIN,
    subpaths: [
      {
        id: 5001,
        title: 'Tipos de notificaciones',
        description: 'Tipos de notificaciones',
        path: paths.TYPES_LIST.NOTIFICATIONS,
        subpaths: [],
        privateRoute: true,
        element: <NotificationsTypesView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 5002,
        title: 'Tipos de licencias',
        description: 'Tipos de licencias',
        path: paths.TYPES_LIST.LICENSES,
        subpaths: [],
        privateRoute: true,
        element: <LicensesTypesView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 5003,
        title: 'Tipos de capacitaciones',
        description: 'Tipos de capacitaciones',
        path: paths.TYPES_LIST.TRAININGS,
        subpaths: [],
        privateRoute: true,
        element: <TrainingsTypesView />,
        allowedRoles: ['ADMIN'],
      },
    ],
    privateRoute: true,
    element: <TypesListView />,
    allowedRoles: ['ADMIN'],
  },
  {
    id: 6000,
    title: 'Ajustes',
    icon: <IoSettingsSharp />,
    description: 'Ajustes',
    path: paths.SETTINGS.MAIN,
    subpaths: [
      {
        id: 6001,
        title: 'Cambiar contraseña',
        description: 'Cambiar contraseña',
        path: paths.SETTINGS.CHANGE_PASSWORD,
        subpaths: [],
        privateRoute: true,
        element: <ChangePasswordView />,
        allowedRoles: ['ADMIN', 'EMPLOYEE', 'READ_ONLY'],
      },
      {
        id: 6002,
        title: 'Registros de inicio de sesión',
        description: 'Registros de inicio de sesión',
        path: paths.SETTINGS.LOGIN_LOGS,
        subpaths: [],
        privateRoute: true,
        element: <LoginLogsView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 6003,
        title: 'Hacer administrador',
        description: 'Hacer administrador',
        path: paths.SETTINGS.MAKE_ADMIN,
        subpaths: [],
        privateRoute: true,
        element: <CreateAdminView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 6004,
        title: 'Quitar permisos de administrador',
        description: 'Quitar permisos de administrador',
        path: paths.SETTINGS.REMOVE_ADMIN,
        subpaths: [],
        privateRoute: true,
        element: <RemoveAdminView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 6005,
        title: 'Crear usuario de solo lectura',
        description: 'Crear usuario de solo lectura',
        path: paths.SETTINGS.MAKE_READ_ONLY,
        subpaths: [],
        privateRoute: true,
        element: <CreateReadOnlyView />,
        allowedRoles: ['ADMIN'],
      },
      {
        id: 6006,
        title: 'Eliminar usuario de solo lectura',
        description: 'Eliminar usuario de solo lectura',
        path: paths.SETTINGS.REMOVE_READ_ONLY,
        subpaths: [],
        privateRoute: true,
        element: <RemoveReadOnlyView />,
        allowedRoles: ['ADMIN'],
      },
    ],
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
