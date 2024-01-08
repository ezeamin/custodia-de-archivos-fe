import { generateRandomId } from '@/utilities/utils';

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
      name: 'hola2.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      id: generateRandomId(),
      name: 'hola3.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
  ],
};
