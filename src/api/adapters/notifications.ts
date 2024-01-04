import { API_GetNotifications } from '../interface/notifications';

export const getNotificationsAdapter = (data: API_GetNotifications[]) => {
  return data.map((notification) => ({
    id: notification.id,
    text: notification.text,
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
