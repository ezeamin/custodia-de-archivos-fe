import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { UserRole } from '@/constants/userRoles/userRoles';

import { getUsersAdapter, postUserAdapter } from '../adapters/users';

import { API_EmptyResponse } from '../interface';
import {
  API_GetUsers,
  API_PostUser,
  BasicUser,
  CreatedUser,
} from '../interface/users';

export const getUsersFn = async ({ role }: { role?: UserRole }) => {
  let { search } = window.location;

  if (role) {
    const concatenationSymbol = search.length === 0 ? '?' : '&';
    search += `${concatenationSymbol}role=${role.toLowerCase()}`;
  }

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

export const deleteAdminFn = async (userId: string) => {
  const request = apiRoutes.USERS.DELETE_ADMIN({ id: userId });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const postReadOnlyUserFn = async (body: {
  username: string;
  password: string;
}) => {
  const request = apiRoutes.USERS.POST_READ_ONLY_USER();

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};

export const deleteReadOnlyUserFn = async (userId: string) => {
  const request = apiRoutes.USERS.DELETE_READ_ONLY_USER({ id: userId });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};
