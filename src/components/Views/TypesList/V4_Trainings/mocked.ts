import { generateRandomId } from '@/utilities/utils';

import { TrainingType } from '@/api/interface/employees';

const typeDescriptions = [
  'Capacitación de género',
  'Capacitación sobre diversidad e inclusión',
  'Capacitación contra el acoso laboral',
  'Capacitación ética en el trabajo',
  'Capacitación sobre prevención de conflictos',
  'Capacitación sobre normativas internas',
  'Capacitación de seguridad en el trabajo',
  'Capacitación de responsabilidad social corporativa',
  'Capacitación sobre igualdad salarial',
  'Capacitación sobre ambiente laboral saludable',
];

const generateMockedTrainingsTypes = () => {
  const newArr = typeDescriptions.map((training) => ({
    id: generateRandomId(),
    title: training,
    description: 'Descripción de prueba',
  }));

  return { data: newArr };
};

export const mockedTypesList: { data: TrainingType[] } =
  generateMockedTrainingsTypes();
