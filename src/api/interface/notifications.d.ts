import { Role } from './params';

import { BasicList } from '@/interface';

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface NotificationFile {
  id: string;
  name: string;
  url: string;
}

export interface API_GetSentNotifications {
  id: string;
  message: string;
  issuer: {
    firstname: string;
    lastname: string;
    id: string;
    email?: string;
    imgSrc?: string;
  };
  receivers: {
    name: string;
    id: string;
    imgSrc: string;
    hasReadNotification: boolean;
    timeReadNotification: string;
    email?: string;
  }[];
  type: {
    id: string;
    title: string;
    description: string;
  };
  date: string;
  files?: NotificationFile[];
}

export interface API_GetNotifications {
  id: string;
  message: string;
  issuer: {
    firstname: string;
    lastname: string;
    id: string;
    email?: string;
    imgSrc?: string;
  };
  type: {
    id: string;
    title: string;
    description: string;
  };
  hasBeenRead: boolean;
  date: string;
  files?: NotificationFile[];
}

export interface API_GetNotificationsTypes {
  id: string;
  title: string;
  description: string;
  startHour: string;
  endHour: string;
  allowedRoles: Role[];
  canModify: boolean;
}

export interface API_GetNotificationsReceivers extends BasicList {
  type: string;
}

export interface API_GetNotificationsAreaReceivers {
  name: string;
  id: string;
  imgSrc: string;
  hasReadNotification: boolean;
  timeReadNotification: string;
  email?: string;
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface Notification extends API_GetNotifications {}
export interface SentNotification extends API_GetSentNotifications {}
export interface NotificationType extends API_GetNotificationsTypes {}
export interface NotificationReceiver extends API_GetNotificationsReceivers {}
export interface NotificationsAreaReceiver
  extends API_GetNotificationsAreaReceivers {}
