import { BasicList } from '@/interface';

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_GetRoles extends BasicList {}
export interface API_GetGenders extends BasicList {}
export interface API_GetAreas extends BasicList {}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface Role extends API_GetRoles {}
export interface Gender extends API_GetGenders {}
export interface Area extends API_GetAreas {}
