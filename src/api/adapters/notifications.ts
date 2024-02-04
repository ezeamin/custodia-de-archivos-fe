import {
  API_GetNotifications,
  API_GetNotificationsReceivers,
  API_GetNotificationsTypes,
  API_GetSentNotifications,
  Notification,
  NotificationReceiver,
  NotificationType,
  SentNotification,
} from '../interface/notifications';

export const getSentNotificationsAdapter = (
  data: API_GetSentNotifications[]
): SentNotification[] => {
  return data.map((notification) => ({
    id: notification.id,
    message: notification.message,
    issuer: {
      id: notification.issuer.id,
      firstname: notification.issuer.firstname,
      lastname: notification.issuer.lastname,
      email: notification.issuer.email,
      imgSrc: notification.issuer.imgSrc,
    },
    receivers: notification.receivers.map((receiver) => ({
      id: receiver.id,
      name: receiver.name,
      email: receiver.email,
      imgSrc: receiver.imgSrc,
      hasReadNotification: receiver.hasReadNotification,
      timeReadNotification: receiver.timeReadNotification,
    })),
    type: notification.type,
    date: notification.date,
    files: notification.files,
  }));
};

export const getNotificationsAdapter = (
  data: API_GetNotifications[]
): Notification[] => {
  return data.map((notification) => ({
    id: notification.id,
    message: notification.message,
    issuer: {
      id: notification.issuer.id,
      firstname: notification.issuer.firstname,
      lastname: notification.issuer.lastname,
      email: notification.issuer.email,
      imgSrc: notification.issuer.imgSrc,
    },
    hasBeenRead: notification.hasBeenRead,
    type: notification.type,
    date: notification.date,
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
    email: data.issuer.email,
    imgSrc: data.issuer.imgSrc,
  },
  type: data.type,
  date: data.date,
  hasBeenRead: data.hasBeenRead,
  files: data.files,
});

export const getSentNotificationAdapter = (
  data: API_GetSentNotifications
): SentNotification => ({
  id: data.id,
  message: data.message,
  issuer: {
    firstname: data.issuer.firstname,
    lastname: data.issuer.lastname,
    id: data.issuer.id,
    email: data.issuer.email,
    imgSrc: data.issuer.imgSrc,
  },
  receivers: data.receivers.map((receiver) => ({
    id: receiver.id,
    name: receiver.name,
    email: receiver.email,
    imgSrc: receiver.imgSrc,
    hasReadNotification: receiver.hasReadNotification,
    timeReadNotification: receiver.timeReadNotification,
  })),
  type: data.type,
  date: data.date,
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
    canModify: notification.canModify,
  }));
};

export const getNotificationTypeAdapter = (
  data: API_GetNotificationsTypes
): NotificationType => ({
  id: data.id,
  title: data.title,
  description: data.description,
  startHour: data.startHour,
  endHour: data.endHour,
  allowedRoles: data.allowedRoles,
  canModify: data.canModify,
});

export const getNotificationsReceiversAdapter = (
  data: API_GetNotificationsReceivers[]
): NotificationReceiver[] => {
  return data.map((notification) => ({
    id: notification.id,
    description: notification.description,
    type: notification.type,
  }));
};
