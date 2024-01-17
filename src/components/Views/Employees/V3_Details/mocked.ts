import { generateRandomId } from '@/utilities/utils';

import {
  Absence,
  Employee,
  ExtraHours,
  FormalWarning,
  LateArrival,
  License,
  LicenseType,
  Training,
  TrainingType,
  Vacation,
} from '@/api/interface/employees';

export const mockedEmployee: { data: Employee } = {
  data: {
    id: generateRandomId(),
    dni: '12345678',
    imgSrc:
      'https://media.es.wired.com/photos/642df54a5c92c1355e3f3e01/1:1/w_2002,h_2002,c_limit/super%20mario%20bros%20criticas.jpg',
    lastname: 'Doe',
    firstname: 'John',
    birthdate: '1990-01-01T00:00:00.000Z',
    age: 30,
    antiquity: 2,
    gender: {
      id: generateRandomId(),
      description: 'Hombre pecho peludo',
    },
    registrationDate: '2020-01-01T00:00:00.000Z',
    departureDate: null,
    phone: '+5493815038570',
    email: 'johndoe@gmail.com',
    position: 'Software Engineer',
    area: { id: generateRandomId(), description: 'Engineering' },
    address: {
      street: {
        id: '9011903002135',
        description: 'PRINGLES',
      },
      streetNumber: 123,
      apt: '1A',
      locality: {
        id: '90119',
        description: 'YERBA BUENA',
      },
      state: {
        id: '90',
        description: 'TUCUMÁN',
      },
    },
    fileNumber: 101,
    status: { id: generateRandomId(), description: 'active' },
    user: null,
  },
};

export const mockedDocs = {
  totalElements: 3,
  data: [
    {
      id: generateRandomId(),
      name: 'hola.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      id: generateRandomId(),
      name: 'Captura de pantalla 2024-01-08 113146.png',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      id: generateRandomId(),
      name: 'hola3.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
  ],
};

export const mockedHistory = {
  data: [
    {
      id: generateRandomId(),
      previousValue: 'Software Engineer',
      newValue: 'Senior Software Engineer',
      field: 'Puesto',
      date: '2020-01-01T00:00:00.000Z',
      user: {
        id: generateRandomId(),
        description: 'John Doe',
      },
    },
    {
      id: generateRandomId(),
      previousValue: 'Senior Software Engineer',
      newValue: 'Tech Lead',
      field: 'Puesto',
      date: '2021-03-15T12:30:00.000Z',
      user: {
        id: generateRandomId(),
        description: 'John Doe',
      },
    },
    {
      id: generateRandomId(),
      previousValue: 'active',
      newValue: 'suspended',
      field: 'Estado',
      date: '2022-05-20T09:45:00.000Z',
      user: {
        id: generateRandomId(),
        description: 'John Doe',
      },
    },
    {
      id: generateRandomId(),
      previousValue: 'John',
      newValue: 'Jonathan',
      field: 'Nombre',
      date: '2023-08-10T18:20:00.000Z',
      user: {
        id: generateRandomId(),
        description: 'John Doe',
      },
    },
    {
      id: generateRandomId(),
      previousValue: '123 Main St',
      newValue: '456 Oak Ave',
      field: 'Dirección',
      date: '2024-02-28T14:10:00.000Z',
      user: {
        id: generateRandomId(),
        description: 'John Doe',
      },
    },
  ],
};

const generateRandomReason = (): string => {
  const reasons = [
    'Vacaciones',
    'Enfermedad',
    'Asuntos personales',
    'Capacitación',
    'Cita médica',
    'Trabajo remoto',
    'Día libre',
    'Maternidad/Paternidad',
    'Baja por estudio',
    'Falta justificada',
  ];

  return Math.random() < 0.5
    ? reasons[Math.floor(Math.random() * reasons.length)]
    : `Razón larga: ${Math.random().toString(36).substr(2, 20)}`;
};

// Function to generate mocked absences
const generateMockedAbsences = (count: number): { data: Absence[] } => {
  const absences: Absence[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const date = new Date().toISOString();
    const reason = generateRandomReason();

    absences.push({ id, date, reason });
  }

  return { data: absences };
};

export const mockedAbsences: { data: Absence[] } = generateMockedAbsences(30);

const generateMockedVacations = (count: number): { data: Vacation[] } => {
  const vacations: Vacation[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const startDate = new Date().toISOString();
    const endDate = new Date(
      new Date().getTime() +
        Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
    ).toISOString();

    vacations.push({ id, startDate, endDate });
  }

  return { data: vacations };
};

// Generate 10 mocked vacations
export const mockedVacations: { data: Vacation[] } = generateMockedVacations(3);

const typeDescriptions = [
  'Licencia por maternidad',
  'Licencia por paternidad',
  'Licencia médica',
  'Licencia de estudio',
  'Licencia especial',
  'Licencia sin goce de sueldo',
  'Permiso por duelo',
  'Licencia por mudanza',
  'Licencia remunerada',
];

const trainingTypeDescriptions = [
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

const generateRandomTypeDescription = (): string => {
  return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
};

// Function to generate mocked licenses
const generateMockedLicenses = (count: number): { data: License[] } => {
  const licenses: License[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const startDate = new Date(
      new Date().getTime() +
        Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(); // Random start date within the next 30 days
    const endDate = new Date(
      new Date(startDate).getTime() +
        Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(); // Random end date within the next 30 days
    const typeId = generateRandomId();
    const typeDescription = generateRandomTypeDescription();
    const observations = `Observaciones de la licencia número ${i + 1}`;

    licenses.push({
      id,
      startDate,
      endDate,
      type: {
        id: typeId,
        description: typeDescription,
      },
      observations,
    });
  }

  return { data: licenses };
};

// Generate 10 mocked licenses
export const mockedLicenses: { data: License[] } = generateMockedLicenses(6);

// Function to generate random type descriptions in Spanish for punishment capacitations
const generateRandomTypeDescriptionTrainings = (): string => {
  return trainingTypeDescriptions[
    Math.floor(Math.random() * trainingTypeDescriptions.length)
  ];
};

// Function to generate mocked trainings
const generateMockedTrainings = (count: number): { data: Training[] } => {
  const trainings: Training[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const date = new Date().toISOString();
    const reason = `Capacitación número ${i + 1}`; // Adjust the reason as needed
    const typeId = generateRandomId();
    const typeDescription = generateRandomTypeDescriptionTrainings();

    trainings.push({
      id,
      date,
      reason,
      type: {
        id: typeId,
        description: typeDescription,
      },
    });
  }

  return { data: trainings };
};

// Generate 10 mocked trainings
export const mockedTrainings: { data: Training[] } =
  generateMockedTrainings(11);

// Function to generate random late arrival times after 08:00
const generateRandomLateArrivalTime = (): string => {
  const minutesLate = Math.floor(Math.random() * 60);
  const hoursLate = Math.floor(Math.random() * 3); // Allow up to 3 hours of lateness
  const totalMinutesLate = minutesLate + hoursLate * 60;

  const baseTime = new Date('2024-01-01T08:00:00'); // Assuming a base date for simplicity
  const lateArrivalTime = new Date(
    baseTime.getTime() + totalMinutesLate * 60 * 1000
  );

  return lateArrivalTime.toISOString().substr(11, 8); // Extract HH:mm:ss from the ISO string
};

// Function to generate mocked late arrivals
const generateMockedLateArrivals = (count: number): { data: LateArrival[] } => {
  const lateArrivals: LateArrival[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const currentDate = new Date();
    const lateArrivalDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + Math.floor(Math.random() * 30), // Random date within the next 30 days
      8, // 08:00 in hours
      0, // 00 minutes
      0 // 00 seconds
    );

    const dateISOString = lateArrivalDate.toISOString();
    const date =
      dateISOString.substring(0, dateISOString.indexOf('T') + 1) +
      generateRandomLateArrivalTime();

    lateArrivals.push({
      id,
      date,
      observations: `Observaciones de la llegada tarde número ${i + 1}`,
    });
  }

  return { data: lateArrivals };
};

// Generate 10 mocked late arrivals
export const mockedLateArrivals: { data: LateArrival[] } =
  generateMockedLateArrivals(10);

// Function to generate mocked formal warnings
const generateMockedFormalWarnings = (
  count: number
): { data: FormalWarning[] } => {
  const formalWarnings: FormalWarning[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const date = new Date(
      new Date().getTime() + i * 24 * 60 * 60 * 1000
    ).toISOString(); // Incrementing days for each warning
    const reason = `Motivo de la advertencia número ${i + 1}`; // Adjust the reason as needed

    formalWarnings.push({
      id,
      date,
      reason,
    });
  }

  return { data: formalWarnings };
};

// Generate 10 mocked formal warnings
export const mockedFormalWarnings: { data: FormalWarning[] } =
  generateMockedFormalWarnings(10);

const generateMockedLicensesTypes = () => {
  const newArr = typeDescriptions.map((license) => ({
    id: generateRandomId(),
    title: license,
    description: 'Descripción de prueba',
  }));

  return { data: newArr };
};

export const mockedLicensesTypes: { data: LicenseType[] } =
  generateMockedLicensesTypes();

// Function to generate mocked extra hours
const generateMockedExtraHours = (count: number): { data: ExtraHours[] } => {
  const extraHours: ExtraHours[] = [];

  for (let i = 0; i < count; i += 1) {
    const id = generateRandomId();
    const date = new Date(
      new Date().getTime() +
        Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(); // Random date within the next 30 days
    const hours = Math.floor(Math.random() * 10) + 1; // Random hours between 1 and 10

    extraHours.push({
      id,
      date,
      hours,
    });
  }

  return { data: extraHours };
};

// Generate 10 mocked extra hours
export const mockedExtraHours: { data: ExtraHours[] } =
  generateMockedExtraHours(10);

const generateMockedTrainingsTypes = () => {
  const newArr = trainingTypeDescriptions.map((training) => ({
    id: generateRandomId(),
    title: training,
    description: 'Descripción de prueba',
  }));

  return { data: newArr };
};

export const mockedTrainingsTypes: { data: TrainingType[] } =
  generateMockedTrainingsTypes();
