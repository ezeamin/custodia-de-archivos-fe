import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import {
  getAreasAdapter,
  getCivilStatusAdapter,
  getGendersAdapter,
  getRelationshipsAdapter,
  getRolesAdapter,
  getStatusAdapter,
} from '../adapters/params';

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

export const getRelationshipOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_RELATIONSHIPS();

  const data = await fetchFn<API_GetRelationships[], Relationship[]>({
    request,
    adapter: getRelationshipsAdapter,
  });

  return data;
};

export const getStatusOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_STATUS();

  const data = await fetchFn<API_GetStatus[], Status[]>({
    request,
    adapter: getStatusAdapter,
  });

  return data;
};

export const getRolesOptionsFn = async (notifications = false) => {
  const request = apiRoutes.PARAMS.GET_ROLES({ notifications });

  const data = await fetchFn<API_GetRoles[], Role[]>({
    request,
    adapter: getRolesAdapter,
  });

  return data;
};

export const getGenderOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_GENDERS();

  const data = await fetchFn<API_GetGenders[], Gender[]>({
    request,
    adapter: getGendersAdapter,
  });

  return data;
};

export const getAreaOptionsFn = async (filterAssignable = false) => {
  const request = apiRoutes.PARAMS.GET_AREAS({ filterAssignable });

  const data = await fetchFn<API_GetAreas[], Area[]>({
    request,
    adapter: getAreasAdapter,
  });

  return data;
};

export const getCivilStatusOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_CIVIL_STATUS();

  const data = await fetchFn<API_GetCivilStatus[], CivilStatus[]>({
    request,
    adapter: getCivilStatusAdapter,
  });

  return data;
};
