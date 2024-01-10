import { generateRandomId } from '@/utilities/utils';

import { Employee } from '@/api/interface/employees';

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
      street: 'Main Street',
      number: 123,
      apt: 1,
      city: 'New York',
      state: 'New York',
      country: 'United States',
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
      field: 'position',
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
      field: 'position',
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
      field: 'status',
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
      field: 'firstname',
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
      field: 'address',
      date: '2024-02-28T14:10:00.000Z',
      user: {
        id: generateRandomId(),
        description: 'John Doe',
      },
    },
  ],
};
