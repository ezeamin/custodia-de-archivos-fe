import { fetchFn } from '../fetchFn';

import { apiRoutes } from '@/api/routes/apiRoutes';

import { getEmployeesAdapter } from '../adapters/employees';

import { API_EmptyResponse } from '../interface';
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

export const postEmployee = async (body: FormData) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE();

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};
