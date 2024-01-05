// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------
import { BasicList } from '@/interface';

export interface API_GetNotifications {
  id: string;
  text: string;
  issuer: {
    firstname: string;
    lastname: string;
    id: string;
  };
  receiver: {
    firstname: string;
    lastname: string;
    id: string;
  };
  type: string;
  date: string;
  hasBeenRead: boolean;
  files?: string[];
}

export interface API_GetNotificationsTypes {
  id: string;
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
