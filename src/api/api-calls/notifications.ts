import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { cleanUpDataToSend } from '@/utilities/utils';

import {
  getNotificationAdapter,
  getNotificationsAdapter,
  getNotificationsReceiversAdapter,
  getNotificationsTypesAdapter,
  getNotificationTypeAdapter,
  getSentNotificationAdapter,
  getSentNotificationsAdapter,
} from '../adapters/notifications';

import { API_EmptyResponse } from '../interface';
import {
  API_GetNotifications,
  API_GetNotificationsReceivers,
  API_GetNotificationsTypes,
  API_GetSentNotifications,
  Notification,
  NotificationReceiver,
  NotificationType,
  SentNotification,
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

  const data = await fetchFn<API_GetSentNotifications[], SentNotification[]>({
    request,
    adapter: getSentNotificationsAdapter,
  });

  return data;
};

export const getSentNotificationFn = async (id: string) => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION({
    id,
    sent: true,
  });

  const data = await fetchFn<API_GetSentNotifications, SentNotification>({
    request,
    adapter: getSentNotificationAdapter,
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

export const postNotificationFn = async (body: FormData) => {
  const request = apiRoutes.NOTIFICATIONS.POST_NOTIFICATION();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const getNotificationReceiversFn = async () => {
  const request = apiRoutes.NOTIFICATIONS.GET_NOTIFICATION_RECEIVERS();

  const data = await fetchFn<
    API_GetNotificationsReceivers[],
    NotificationReceiver[]
  >({
    request,
    adapter: getNotificationsReceiversAdapter,
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
    adapter: getNotificationTypeAdapter,
  });

  return data;
};
