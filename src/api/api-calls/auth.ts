import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { postLoginAdapter } from '../adapters/auth';

import { API_EmptyResponse } from '../interface';
import { API_PostLogin, PostLogin } from '../interface/auth';

export const postLoginFn = async (body: {
  username: string;
  password: string;
}) => {
  const request = apiRoutes.AUTH.POST_LOGIN();

  const data = await fetchFn<API_PostLogin, PostLogin>({
    request,
    adapter: postLoginAdapter,
    body,
  });

  return data;
};

export const getRefreshTokenFn = async () => {
  const request = apiRoutes.AUTH.GET_REFRESH_TOKEN();

  const data = await fetchFn<API_PostLogin, PostLogin>({
    request,
    adapter: postLoginAdapter,
  });

  return data;
};

export const postLogoutFn = async () => {
  const request = apiRoutes.AUTH.POST_LOGOUT();

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    useToken: true,
  });

  return data;
};
