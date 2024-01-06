import {
  API_GetAreas,
  API_GetGenders,
  API_GetRoles,
  Area,
  Gender,
  Role,
} from '../interface/params';

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
