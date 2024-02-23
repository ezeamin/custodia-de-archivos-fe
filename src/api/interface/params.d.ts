import { BasicList } from '@/interface';

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_GetRelationships extends BasicList {}
export interface API_GetStatus extends BasicList {}
export interface API_GetRoles extends BasicList {}
export interface API_GetGenders extends BasicList {}
export interface API_GetAreas extends BasicList {
  responsibleEmail: string | null;
}
export interface API_GetCivilStatus extends BasicList {}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface Relationship extends API_GetRelationships {}
export interface Status extends API_GetStatus {}
export interface Role extends API_GetRoles {}
export interface Gender extends API_GetGenders {}
export interface Area extends API_GetAreas {}
export interface CivilStatus extends API_GetCivilStatus {}
