import { ApiRoute } from '../interface/routes';

export const apiRoutes = {
  EMPLOYEES: {
    GET_EMPLOYEES: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees${params}`,
    }),
  },
};
