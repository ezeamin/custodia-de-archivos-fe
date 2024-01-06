import { API_GetRoles, Role } from '../interface/params';

export const getRolesAdapter = (data: API_GetRoles[]): Role[] => {
  return data.map((role) => ({
    id: role.id,
    description: role.description,
  }));
};
