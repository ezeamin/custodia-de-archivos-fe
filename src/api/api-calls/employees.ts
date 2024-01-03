import { fetchFn } from '../fetchFn';

import { apiRoutes } from '@/api/routes/apiRoutes';

import { getEmployeesAdapter } from '../adapters/employees';

import { API_GetEmployees, Employee } from '../interface/employees';

export const getEmployees = async () => {
  const { search } = window.location;

  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEES({ params: search });

  const data = await fetchFn<API_GetEmployees[], Employee[]>({
    request,
    adapter: getEmployeesAdapter,
  });

  return data;
};
