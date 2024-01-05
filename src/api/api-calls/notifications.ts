import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import {
  getNotificationAdapter,
  getNotificationsAdapter,
  getNotificationsTypesAdapter,
} from '../adapters/notifications';

import { API_EmptyResponse, EmptyResponse } from '../interface';
import {
  API_GetNotifications,
  API_GetNotificationsTypes,
  Notification,
  NotificationType,
} from '@/api/interface/notifications';

export const getNotificationsFn = async (read: boolean) => {
  const { search } = window.location;

  const query = new URLSearchParams(search);
  query.set('hasBeenRead', read.toString());

  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATIONS({
    params: `?${query.toString()}`,
  });

  const data = await fetchFn<API_GetNotifications[], Notification[]>({
    request,
    adapter: getNotificationsAdapter,
  });

  return data;
};

export const getSentNotificationsFn = async () => {
  const query = new URLSearchParams();
  query.set('sent', 'true');

  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATIONS({
    params: `?${query.toString()}`,
  });

  const data = await fetchFn<API_GetNotifications[], Notification[]>({
    request,
    adapter: getNotificationsAdapter,
  });

  return data;
};

export const getNotificationFn = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION({
    id,
  });

  const data = await fetchFn<API_GetNotifications, Notification>({
    request,
    adapter: getNotificationAdapter,
  });

  return data;
};

export const readNotificationFn = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.READ_NOTIFICATION({
    id,
  });

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const postNotificationFn = async (body: FormData) => {
  const request = apiRoutes.NOTIFICATIONS.POST_NOTIFICATION();

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};

export const getNotificationTypesFn = async () => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION_TYPES();

  const data = await fetchFn<API_GetNotificationsTypes[], NotificationType[]>({
    request,
    adapter: getNotificationsTypesAdapter,
  });

  return data;
};

export const getNotificationTypeFn = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION_TYPE({ id });

  const data = await fetchFn<API_GetNotificationsTypes, NotificationType>({
    request,
    adapter: getNotificationsTypesAdapter,
  });

  return data;
};

export const postNotificationTypeFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.NOTIFICATIONS.POST_NOTIFICATION_TYPE();

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
    body,
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

  const dataToBeSent = {
    ...body,
    id: undefined,
  };

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
    body: dataToBeSent,
  });

  return data;
};

export const deleteNotificationTypeFn = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.DELETE_NOTIFICATION_TYPE({ id });

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};
