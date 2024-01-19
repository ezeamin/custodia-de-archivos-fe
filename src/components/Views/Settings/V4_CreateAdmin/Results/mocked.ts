import { generateRandomId } from '@/utilities/utils';

import { BasicUser, ReadOnlyUser } from '@/api/interface/users';

export const mockedUserList: {
  totalElements: number;
  data: (BasicUser | ReadOnlyUser)[];
} = {
  totalElements: 3,
  data: [
    {
      id: generateRandomId(),
      username: '43706393',
      imgSrc:
        'https://media.es.wired.com/photos/642df54a5c92c1355e3f3e01/1:1/w_2002,h_2002,c_limit/super%20mario%20bros%20criticas.jpg',
      firstname: 'John',
      lastname: 'Doe',
      role: {
        id: generateRandomId(),
        description: 'USER',
      },
    },
    {
      id: generateRandomId(),
      username: '15236958',
      imgSrc:
        'https://media.es.wired.com/photos/642df54a5c92c1355e3f3e01/1:1/w_2002,h_2002,c_limit/super%20mario%20bros%20criticas.jpg',
      firstname: 'Jane',
      lastname: 'Smith',
      role: {
        id: generateRandomId(),
        description: 'ADMIN',
      },
    },
    {
      id: generateRandomId(),
      username: '36528497',
      imgSrc:
        'https://media.es.wired.com/photos/642df54a5c92c1355e3f3e01/1:1/w_2002,h_2002,c_limit/super%20mario%20bros%20criticas.jpg',
      firstname: 'Robert',
      lastname: 'Johnson',
      role: {
        id: generateRandomId(),
        description: 'USER',
      },
    },
    {
      id: generateRandomId(),
      username: '36528497',
      role: {
        id: generateRandomId(),
        description: 'READ_ONLY',
      },
    },
  ],
};
