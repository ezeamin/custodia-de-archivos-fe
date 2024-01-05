import { generateRandomId } from '@/utilities/utils';

export const typeOptions = {
  data: [
    {
      id: generateRandomId(),
      description: 'Administrativa',
    },
    {
      id: generateRandomId(),
      description: 'Mantenimiento',
    },
    {
      id: generateRandomId(),
      description: 'Nueva documentación',
    },
    {
      id: generateRandomId(),
      description: 'Otro',
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
