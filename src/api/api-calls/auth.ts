import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { postLoginAdapter, postRecoverPasswordAdapter } from '../adapters/auth';

import { API_EmptyResponse } from '../interface';
import {
  API_PostLogin,
  API_PostRecoverPassword,
  Login,
  RecoverPassword,
} from '../interface/auth';

export const postLoginFn = async (body: {
  username: string;
  password: string;
}) => {
  const request = apiRoutes.AUTH.POST_LOGIN();

  const data = await fetchFn<API_PostLogin, Login>({
    request,
    adapter: postLoginAdapter,
    body,
  });

  return data;
};

export const getRefreshTokenFn = async () => {
  const request = apiRoutes.AUTH.GET_REFRESH_TOKEN();

  const data = await fetchFn<API_PostLogin, Login>({
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
  });

  return data;
};

export const postRecoverPasswordFn = async (body: { username: string }) => {
  const request = apiRoutes.AUTH.POST_RECOVER_PASS();

  const data = await fetchFn<API_PostRecoverPassword, RecoverPassword>({
    request,
    adapter: postRecoverPasswordAdapter,
    body,
  });

  return data;
};

export const postResetPasswordFn = async (body: {
  password: string;
  repeatPassword: string;
  token: string;
}) => {
  const { token, ...bodyWithoutToken } = body;

  const request = {
    ...apiRoutes.AUTH.POST_RESET_PASS(),
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: bodyWithoutToken,
  });

  return data;
};
