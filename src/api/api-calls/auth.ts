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
  const request = apiRoutes.AUTH.POST_REFRESH_TOKEN();

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

// From email link
export const putResetPasswordFn = async (body: {
  password: string;
  token: string;
}) => {
  const request = {
    ...apiRoutes.AUTH.PUT_RESET_PASS(),
    headers: { Authorization: `Bearer ${body.token}` },
    useToken: false,
  };

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: { password: body.password },
  });

  return data;
};

// From settings tab
export const putResetPasswordFromSettingsFn = async (body: {
  password: string;
  repeatPassword: string;
}) => {
  const request = apiRoutes.AUTH.PUT_RESET_PASS();

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: { password: body.password },
  });

  return data;
};
