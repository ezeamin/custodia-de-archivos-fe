import { generateRandomId } from '@/utilities/utils';

import { Notification } from '@/api/interface/notifications';

export const mockedData: { data: Notification[]; totalElements: number } = {
  totalElements: 10,
  data: [
    {
      id: generateRandomId(),
      message: 'Short text notification 1',
      issuer: {
        firstname: 'John',
        lastname: 'Doe',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Alice',
        lastname: 'Smith',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Pedido de licencia',
      },
      date: '2024-01-04T10:30:00Z',
      hasBeenRead: false,
      files: ['document1.pdf'],
    },
    {
      id: generateRandomId(),
      message: 'Short text notification 2',
      issuer: {
        firstname: 'Jane',
        lastname: 'Doe',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Bob',
        lastname: 'Johnson',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Justificación de ausentismo',
      },
      date: '2024-01-04T11:45:00Z',
      hasBeenRead: true,
    },
    {
      id: generateRandomId(),
      message: 'Short text notification 3',
      issuer: {
        firstname: 'Ella',
        lastname: 'Brown',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Sam',
        lastname: 'Green',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Nueva documentacion',
      },
      date: '2024-01-04T12:15:00Z',
      hasBeenRead: false,
      files: ['image1.jpg', 'image2.png'],
    },
    {
      id: generateRandomId(),
      message: 'Short text notification 4',
      issuer: {
        firstname: 'Mike',
        lastname: 'White',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Emily',
        lastname: 'Black',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Nueva documentacion',
      },
      date: '2024-01-04T14:00:00Z',
      hasBeenRead: false,
    },
    {
      id: generateRandomId(),
      message: 'Short text notification 5',
      issuer: {
        firstname: 'Chris',
        lastname: 'Taylor',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Olivia',
        lastname: 'Miller',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Otro',
      },
      date: '2024-01-04T15:20:00Z',
      hasBeenRead: true,
    },
    {
      id: generateRandomId(),
      message:
        'Very long text notification 1. This is an example of a notification with a very long text content. It contains multiple sentences and paragraphs to simulate a lengthy message that might be included in a notification. The purpose is to showcase how the text field can accommodate a large amount of information.',
      issuer: {
        firstname: 'Alex',
        lastname: 'Reed',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Sophia',
        lastname: 'Turner',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Pedido de licencia',
      },
      date: '2024-01-04T16:45:00Z',
      hasBeenRead: false,
      files: ['document2.docx'],
    },
    {
      id: generateRandomId(),
      message:
        'Very long text notification 2. Another example of a notification with a very long text content. It includes detailed information, explanations, and additional data to demonstrate the flexibility of the text field in handling extensive messages.',
      issuer: {
        firstname: 'Grace',
        lastname: 'Evans',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Daniel',
        lastname: 'Parker',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Justificación de ausentismo',
      },
      date: '2024-01-04T18:30:00Z',
      hasBeenRead: false,
    },
    {
      id: generateRandomId(),
      message:
        'Very long text notification 3. A lengthy notification message with multiple paragraphs. This serves as an illustration of how the text field can manage and display extensive content within a notification.',
      issuer: {
        firstname: 'Ryan',
        lastname: 'Smith',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Ava',
        lastname: 'Davis',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Nueva documentacion',
      },
      date: '2024-01-04T20:15:00Z',
      hasBeenRead: true,
    },
    {
      id: generateRandomId(),
      message:
        "Very long text notification 4. Demonstrating the capability of handling a long message in a notification. This example showcases the text field's ability to present information in a clear and organized manner, even when the content is extensive.",
      issuer: {
        firstname: 'Sophie',
        lastname: 'Clark',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Matthew',
        lastname: 'Hall',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Otro',
      },
      date: '2024-01-04T22:00:00Z',
      hasBeenRead: false,
    },
    {
      id: generateRandomId(),
      message:
        'Very long text notification 5. An extended notification message with detailed content. This is to exhibit how the text field within a notification can manage large amounts of text, providing a comprehensive view of the information being conveyed.',
      issuer: {
        firstname: 'Nathan',
        lastname: 'Adams',
        id: generateRandomId(),
      },
      receiver: {
        firstname: 'Isabella',
        lastname: 'Wright',
        id: generateRandomId(),
      },
      type: {
        id: generateRandomId(),
        description: 'Pedido de licencia',
      },
      date: '2024-01-04T23:45:00Z',
      hasBeenRead: true,
      files: ['image3.jpg', 'image4.png'],
    },
  ],
};
