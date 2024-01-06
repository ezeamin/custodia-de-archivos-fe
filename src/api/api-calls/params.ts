import { fetchFn } from '../fetchFn';
import { apiRoutes } from '../routes/apiRoutes';

import { getRolesAdapter } from '../adapters/params';

import { API_GetRoles, Role } from '../interface/params';

export const getRolesOptionsFn = async () => {
  const request = apiRoutes.PARAMS.GET_ROLES();

  const data = await fetchFn<API_GetRoles[], Role[]>({
    request,
    adapter: getRolesAdapter,
  });

  return data;
};
