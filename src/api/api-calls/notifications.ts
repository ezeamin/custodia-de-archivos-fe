import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { getNotificationsAdapter } from '../adapters/notifications';

import {
  API_GetNotifications,
  Notification,
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
