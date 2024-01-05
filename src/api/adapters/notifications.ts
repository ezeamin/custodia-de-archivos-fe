import {
  API_GetNotifications,
  API_GetNotificationsReceivers,
  API_GetNotificationsTypes,
  Notification,
  NotificationReceiver,
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

export const getNotificationAdapter = (
  data: API_GetNotifications
): Notification => ({
  id: data.id,
  message: data.message,
  issuer: {
    firstname: data.issuer.firstname,
    lastname: data.issuer.lastname,
    id: data.issuer.id,
  },
  receiver: {
    firstname: data.receiver.firstname,
    lastname: data.receiver.lastname,
    id: data.receiver.id,
  },
  type: data.type,
  date: data.date,
  hasBeenRead: data.hasBeenRead,
  files: data.files,
});

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

export const getNotificationsReceiversAdapter = (
  data: API_GetNotificationsReceivers[]
): NotificationReceiver[] => {
  return data.map((notification) => ({
    id: notification.id,
    description: notification.description,
  }));
};
