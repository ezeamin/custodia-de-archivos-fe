import { generateRandomId } from '@/utilities/utils';

export const genderOptions = {
  data: [
    {
      id: generateRandomId(),
      description: 'Masculino',
    },
    {
      id: generateRandomId(),
      description: 'Femenino',
    },
    {
      id: generateRandomId(),
      description: 'Otro',
    },
  ],
};

export const areaOptions = {
  data: [
    {
      id: generateRandomId(),
      description: 'Sistematización',
    },
    {
      id: generateRandomId(),
      description: 'Clasificación',
    },
    {
      id: generateRandomId(),
      description: 'Atención al cliente',
    },
    {
      id: generateRandomId(),
      description: 'Administración',
    },
    {
      id: generateRandomId(),
      description: 'Mantenimiento',
    },
  ],
};
