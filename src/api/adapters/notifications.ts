import {
  API_GetNotifications,
  API_GetNotificationsTypes,
  Notification,
  NotificationType,
} from '../interface/notifications';

export const getNotificationsAdapter = (
  data: API_GetNotifications[]
): Notification[] => {
  return data.map((notification) => ({
    id: notification.id,
    message: notification.message,
    issuer: {
      firstname: notification.issuer.firstname,
      lastname: notification.issuer.lastname,
      id: notification.issuer.id,
    },
    receiver: {
      firstname: notification.receiver.firstname,
      lastname: notification.receiver.lastname,
      id: notification.receiver.id,
    },
    type: notification.type,
    date: notification.date,
    hasBeenRead: notification.hasBeenRead,
    files: notification.files,
  }));
};

export const getNotificationsTypesAdapter = (
  data: API_GetNotificationsTypes[]
): NotificationType[] => {
  return data.map((notification) => ({
    id: notification.id,
    title: notification.title,
    description: notification.description,
    startHour: notification.startHour,
    endHour: notification.endHour,
    allowedRoles: notification.allowedRoles,
  }));
};
