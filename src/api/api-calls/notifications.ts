import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import {
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

export const getNotifications = async (read: boolean) => {
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

export const getSentNotifications = async () => {
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

export const postNotification = async (body: FormData) => {
  const request = apiRoutes.NOTIFICATIONS.POST_NOTIFICATION();

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};

export const getNotificationTypes = async () => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION_TYPES();

  const data = await fetchFn<API_GetNotificationsTypes[], NotificationType[]>({
    request,
    adapter: getNotificationsTypesAdapter,
  });

  return data;
};

export const getNotificationType = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION_TYPE(id);

  const data = await fetchFn<API_GetNotificationsTypes, NotificationType>({
    request,
    adapter: getNotificationsTypesAdapter,
  });

  return data;
};

export const postNotificationType = async (body: Record<string, unknown>) => {
  const request = apiRoutes.NOTIFICATIONS.POST_NOTIFICATION_TYPE();

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};

export const putNotificationType = async (body: Record<string, unknown>) => {
  if (!body.id || typeof body.id !== 'string') {
    throw new Error('Missing or invalid id');
  }

  const request = apiRoutes.NOTIFICATIONS.PUT_NOTIFICATION_TYPE(body.id);

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

export const deleteNotificationType = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.DELETE_NOTIFICATION_TYPE(id);

  const data = await fetchFn<API_EmptyResponse[], EmptyResponse[]>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};
