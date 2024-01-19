import { generateRandomId } from '@/utilities/utils';

import { LoginLog } from '@/api/interface/users';

export const mockedLoginLogsList: {
  totalElements: number;
  data: LoginLog[];
} = {
  totalElements: 3,
  data: [
    {
      id: generateRandomId(),
      username: '43706393',
      ipAddress: '185.155.23.3',
      userAgent:
        'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:77.0) Gecko/20190101 Firefox/77.0',
      date: '2024-01-12T10:00:00.000Z',
    },
    {
      id: generateRandomId(),
      username: '12345678',
      ipAddress: '10.3.50.1',
      userAgent:
        'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:77.0) Gecko/20190101 Firefox/77.0',
      date: '2023-12-21T13:43:00.000Z',
    },
  ],
};
