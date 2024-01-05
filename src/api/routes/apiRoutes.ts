import { ApiRoute } from '../interface/routes';

export const apiRoutes = {
  EMPLOYEES: {
    GET_EMPLOYEES: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees${params}`,
    }),
    GET_EMPLOYEE: (id: string): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}`,
    }),
    POST_EMPLOYEE: (): ApiRoute => ({
      method: 'POST',
      url: '/employees',
    }),
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications${params}`,
    }),
    GET_NOTIFICATION: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications/${id}`,
    }),
    POST_NOTIFICATION: (): ApiRoute => ({
      method: 'POST',
      url: '/notifications',
    }),
    READ_NOTIFICATION: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/notifications/${id}/read`,
    }),
    GET_NOTIFICATION_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: '/notifications/types',
    }),
    GET_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications/types/${id}`,
    }),
    POST_NOTIFICATION_TYPE: (): ApiRoute => ({
      method: 'POST',
      url: '/notifications/types',
    }),
    PUT_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/notifications/types/${id}`,
    }),
    DELETE_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/notifications/types/${id}`,
    }),
  },
};
