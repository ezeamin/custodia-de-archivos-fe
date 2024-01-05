import { NotificationType } from '@/api/interface/notifications';

export const userRoles = [
  {
    id: '1',
    description: 'Administrador',
  },
  {
    id: '2',
    description: 'Empleado',
  },
];

export const typesList: { data: NotificationType[]; totalElements: number } = {
  totalElements: 3,
  data: [
    {
      id: '1',
      title: 'Tipo de Notificación de prueba',
      description: 'Esta es un tipo de notificación de prueba',
      startHour: '00:00',
      endHour: '23:59',
      allowedRoles: userRoles,
    },
    {
      id: '2',
      title: 'Tipo de Notificación de prueba 2',
      description: 'Esta es un tipo de notificación de prueba 2',
      startHour: '11:00',
      endHour: '15:59',
      allowedRoles: [userRoles[0]],
    },
    {
      id: '3',
      title: 'Tipo de Notificación de prueba 3',
      description: 'Esta es un tipo de notificación de prueba 3',
      startHour: '08:00',
      endHour: '18:00',
      allowedRoles: [userRoles[1]],
    },
  ],
};
