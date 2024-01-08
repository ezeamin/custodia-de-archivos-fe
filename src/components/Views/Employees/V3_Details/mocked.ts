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
  },
};
