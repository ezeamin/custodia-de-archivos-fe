import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { cleanUpDataToSend } from '@/utilities/utils';

import { getAreaAdapter } from '../adapters/params';

import { API_EmptyResponse } from '../interface';
import { API_GetAreas, API_PostArea, Area } from '../interface/params';

export const postNotificationTypeFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.NOTIFICATIONS.POST_NOTIFICATION_TYPE();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const putNotificationTypeFn = async (body: Record<string, unknown>) => {
  if (!body.id || typeof body.id !== 'string') {
    throw new Error('Missing or invalid id');
  }

  const request = apiRoutes.NOTIFICATIONS.PUT_NOTIFICATION_TYPE({
    id: body.id,
  });

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const deleteNotificationTypeFn = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.DELETE_NOTIFICATION_TYPE({ id });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const postEmployeeLicenseTypeFn = async (
  body: Record<string, unknown>
) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_LICENSE_TYPE();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const putEmployeeLicenseTypeFn = async (
  body: Record<string, unknown>
) => {
  if (!body.id || typeof body.id !== 'string') {
    throw new Error('Missing or invalid id');
  }

  const request = apiRoutes.EMPLOYEES.PUT_EMPLOYEE_LICENSE_TYPE({
    id: body.id,
  });

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const deleteEmployeeLicenseTypeFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.DELETE_EMPLOYEE_LICENSE_TYPE({ id });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const postEmployeeTrainingTypeFn = async (
  body: Record<string, unknown>
) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_TRAINING_TYPE();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const putEmployeeTrainingTypeFn = async (
  body: Record<string, unknown>
) => {
  if (!body.id || typeof body.id !== 'string') {
    throw new Error('Missing or invalid id');
  }

  const request = apiRoutes.EMPLOYEES.PUT_EMPLOYEE_TRAINING_TYPE({
    id: body.id,
  });

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const deleteEmployeeTrainingTypeFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.DELETE_EMPLOYEE_TRAINING_TYPE({ id });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const getAreaFn = async (id: string) => {
  const request = apiRoutes.PARAMS.GET_AREA({ id });

  const data = await fetchFn<API_GetAreas, Area>({
    request,
    adapter: getAreaAdapter,
  });

  return data;
};

export const postAreaFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.PARAMS.POST_AREA();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_PostArea>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const putAreaFn = async (body: Record<string, unknown>) => {
  if (!body.id || typeof body.id !== 'string') {
    throw new Error('Missing or invalid id');
  }

  const request = apiRoutes.PARAMS.PUT_AREA({ id: body.id });

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_PostArea>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const deleteAreaFn = async (id: string) => {
  const request = apiRoutes.PARAMS.DELETE_AREA({ id });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};
