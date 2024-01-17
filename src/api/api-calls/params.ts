import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import {
  getAreasAdapter,
  getGendersAdapter,
  getRolesAdapter,
  getStatusAdapter,
} from '../adapters/params';

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

export const getStatusOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_STATUS();

  const data = await fetchFn<API_GetStatus[], Status[]>({
    request,
    adapter: getStatusAdapter,
  });

  return data;
};

export const getRolesOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_ROLES();

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

export const getAreaOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_AREAS();

  const data = await fetchFn<API_GetAreas[], Area[]>({
    request,
    adapter: getAreasAdapter,
  });

  return data;
};
