// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------
import { BasicList } from '@/interface';

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
  receiver: {
    firstname: string;
    lastname: string;
    id: string;
    email?: string;
    imgSrc?: string;
  };
  type: {
    id: string;
    description: string;
  };
  date: string;
  hasBeenRead: boolean;
  files?: {
    id: string;
    name: string;
    url: string;
  }[];
}

export interface API_GetNotificationsTypes {
  id: string;
  title: string;
  description: string;
  startHour: string;
  endHour: string;
  allowedRoles: BasicList[];
}

// ----------------------------------------------------------------------
// Adapters
// ----------------------------------------------------------------------

export interface Notification extends API_GetNotifications {}

export interface NotificationType extends API_GetNotificationsTypes {}
