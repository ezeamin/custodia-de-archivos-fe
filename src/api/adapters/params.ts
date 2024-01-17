import {
  API_GetAreas,
  API_GetGenders,
  API_GetRoles,
  API_GetStatus,
  Area,
  Gender,
  Role,
  Status,
} from '../interface/params';

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
  }));
};
