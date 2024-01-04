// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// Adapters
// ----------------------------------------------------------------------

export interface Notification extends API_GetNotifications {}
