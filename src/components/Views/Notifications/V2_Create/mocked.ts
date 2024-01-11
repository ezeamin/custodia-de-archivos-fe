import { generateRandomId } from '@/utilities/utils';

import { NotificationType } from '@/api/interface/notifications';

export const typeOptions: { data: NotificationType[] } = {
  data: [
    {
      id: generateRandomId(),
      title: 'Administrativa',
      description: 'Descripcion de prueba',
      startHour: '08:00',
      endHour: '16:00',
      allowedRoles: [
        { id: generateRandomId(), description: 'ADMIN' },
        { id: generateRandomId(), description: 'EMPLOYEE' },
      ],
    },
    {
      id: generateRandomId(),
      title: 'Mantenimiento',
      description: 'Descripcion de prueba',
      startHour: '08:00',
      endHour: '16:00',
      allowedRoles: [
        { id: generateRandomId(), description: 'ADMIN' },
        { id: generateRandomId(), description: 'EMPLOYEE' },
      ],
    },
    {
      id: generateRandomId(),
      title: 'Nueva documentación',
      description: 'Descripcion de prueba',
      startHour: '08:00',
      endHour: '16:00',
      allowedRoles: [
        { id: generateRandomId(), description: 'ADMIN' },
        { id: generateRandomId(), description: 'EMPLOYEE' },
      ],
    },
    {
      id: generateRandomId(),
      title: 'Otro',
      description: 'Descripcion de prueba',
      startHour: '08:00',
      endHour: '16:00',
      allowedRoles: [
        { id: generateRandomId(), description: 'ADMIN' },
        { id: generateRandomId(), description: 'EMPLOYEE' },
      ],
    },
  ],
};

export const receiverOptions = {
  data: [
    {
      id: generateRandomId(),
      description: 'Todos los empleados',
    },
    {
      id: generateRandomId(),
      description: 'González, Juan',
    },
    {
      id: generateRandomId(),
      description: 'Paredes, Armando',
    },
    {
      id: generateRandomId(),
      description: 'Zurita, Elva',
    },
    {
      id: generateRandomId(),
      description: 'Tec, Elvis',
    },
  ],
};
