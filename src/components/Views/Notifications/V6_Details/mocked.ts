import { generateRandomId } from '@/utilities/utils';

import { Notification } from '@/api/interface/notifications';

export const mockedData: { data: Notification } = {
  data: {
    id: generateRandomId(),
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae commodo diam. Aliquam erat volutpat. Donec sit amet nunc eget nisi aliquet efficitur. Sed aliquet, nunc vitae tincidunt congue, nunc nulla lacinia magna, vitae luctus velit leo id mauris. Nullam at semper ipsum. Sed in nunc eget nisl aliquet finibus. Nulla facilisi. Sed quis tellus in ante malesuada tincidunt. Sed in nunc eget nisl aliquet finibus. Nulla facilisi. Sed quis tellus in ante malesuada tincidunt.',
    issuer: {
      firstname: 'Mario',
      lastname: 'Doe',
      imgSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYt0MXNN8I6PRjfvMTcgUp6iJQwSQdTvwvLQ&usqp=CAU',
      email: 'mariodoe@gmail.com',
      id: generateRandomId(),
    },
    receiver: {
      firstname: 'Peach',
      lastname: 'Smith',
      imgSrc:
        'https://www.anmosugoi.com/wp-content/uploads/2023/04/Super-Mario-Bross-Peach.jpg',
      email: 'peachsmith@gmail.com',
      id: generateRandomId(),
    },
    type: {
      id: generateRandomId(),
      description: 'Nueva documentación',
    },
    date: '2021-01-01T00:00:00.000Z',
    hasBeenRead: false,
    files: [
      {
        id: generateRandomId(),
        name: 'super_important_pdf.pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        id: generateRandomId(),
        name: 'sample_image.jpg',
        url: 'https://www.w3schools.com/w3css/img_lights.jpg',
      },
    ],
  },
};
