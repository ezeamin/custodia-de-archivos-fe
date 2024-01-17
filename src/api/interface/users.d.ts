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
}
export interface API_PostUser {
  username: string;
  password: string;
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface BasicUser extends API_GetUsers {}
export interface CreatedUser extends API_PostUser {}
