import { UserRole } from '@/constants/userRoles/userRoles';

export type AnyProp = Record<string, unknown>;

export interface BasicList {
  id: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
