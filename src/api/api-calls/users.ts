import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { getUsersAdapter, postUserAdapter } from '../adapters/users';

import { API_EmptyResponse } from '../interface';
import {
  API_GetUsers,
  API_PostUser,
  BasicUser,
  CreatedUser,
} from '../interface/users';

export const getUsersFn = async () => {
  const { search } = window.location;

  const request = apiRoutes.USERS.GET_USERS({ params: search });

  const data = await fetchFn<API_GetUsers[], BasicUser[]>({
    request,
    adapter: getUsersAdapter,
  });

  return data;
};

export const postUserFn = async (employeeId: string) => {
  const request = apiRoutes.USERS.POST_USER();

  const data = await fetchFn<API_PostUser, CreatedUser>({
    request,
    adapter: postUserAdapter,
    body: { employeeId },
  });

  return data;
};

export const putCreateAdminFn = async (userId: string) => {
  const request = apiRoutes.USERS.PUT_CREATE_ADMIN({ id: userId });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};
