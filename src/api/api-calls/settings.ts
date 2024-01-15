import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { API_EmptyResponse } from '../interface';

export const postResetPasswordFn = async (body: {
  password: string;
  repeatPassword: string;
}) => {
  const request = apiRoutes.AUTH.PUT_RESET_PASS();

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};
