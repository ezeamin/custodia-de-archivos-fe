import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import {
  getAreasAdapter,
  getGendersAdapter,
  getRolesAdapter,
} from '../adapters/params';

import {
  API_GetAreas,
  API_GetGenders,
  API_GetRoles,
  Area,
  Gender,
  Role,
} from '../interface/params';

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
