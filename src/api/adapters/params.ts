import {
  API_GetAreas,
  API_GetCivilStatus,
  API_GetGenders,
  API_GetRelationships,
  API_GetRoles,
  API_GetStatus,
  Area,
  CivilStatus,
  Gender,
  Relationship,
  Role,
  Status,
} from '../interface/params';

export const getRelationshipsAdapter = (
  data: API_GetRelationships[]
): Relationship[] => {
  return data.map((relationship) => ({
    id: relationship.id,
    description: relationship.description,
  }));
};

export const getStatusAdapter = (data: API_GetStatus[]): Status[] => {
  return data.map((status) => ({
    id: status.id,
    description: status.description,
  }));
};

export const getRolesAdapter = (data: API_GetRoles[]): Role[] => {
  return data.map((role) => ({
    id: role.id,
    description: role.description,
  }));
};

export const getGendersAdapter = (data: API_GetGenders[]): Gender[] => {
  return data.map((gender) => ({
    id: gender.id,
    description: gender.description,
  }));
};

export const getAreasAdapter = (data: API_GetAreas[]): Area[] => {
  return data.map((area) => ({
    id: area.id,
    description: area.description,
    responsibleEmail: area.responsibleEmail,
    username: area.username,
  }));
};

export const getCivilStatusAdapter = (
  data: API_GetCivilStatus[]
): CivilStatus[] => {
  return data.map((area) => ({
    id: area.id,
    description: area.description,
  }));
};

export const getAreaAdapter = (data: API_GetAreas): Area => ({
  id: data.id,
  description: data.description,
  responsibleEmail: data.responsibleEmail,
  username: data.username,
});
