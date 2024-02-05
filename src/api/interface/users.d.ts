import { BasicList } from '@/interface';

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_GetUsers {
  id: string;
  username: string;
  imgSrc: string;
  firstname: string;
  lastname: string;
  role: BasicList;
  description?: string;
}
export interface API_PostUser {
  username: string;
  password: string;
}

export interface API_GetLoginLogs {
  id: string;
  username: string;
  ipAddress: string;
  userAgent: string;
  date: string;
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface BasicUser extends API_GetUsers {}
export interface CreatedUser extends API_PostUser {}
export interface ReadOnlyUser extends API_GetUsers {}
export interface LoginLog extends API_GetLoginLogs {}
