import { fetchFn } from '../fetchFn';

import { apiRoutes } from '@/api/routes/apiRoutes';

import {
  getEmployeeAdapter,
  getEmployeeDocsAdapter,
  getEmployeesAdapter,
} from '../adapters/employees';

import { API_EmptyResponse } from '../interface';
import {
  API_GetEmployee,
  API_GetEmployeeDocs,
  API_GetEmployees,
  API_GetHistory,
  Employee,
  EmployeeDoc,
  History,
  MinimalEmployee,
} from '../interface/employees';

export const getEmployeesFn = async () => {
  const { search } = window.location;

  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEES({ params: search });

  const data = await fetchFn<API_GetEmployees[], MinimalEmployee[]>({
    request,
    adapter: getEmployeesAdapter,
  });

  return data;
};

export const getEmployeeFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE({ id });

  const data = await fetchFn<API_GetEmployee, Employee>({
    request,
    adapter: getEmployeeAdapter,
  });

  return data;
};

export const getEmployeeDocsFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_DOCS({ id });

  const data = await fetchFn<API_GetEmployeeDocs[], EmployeeDoc[]>({
    request,
    adapter: getEmployeeDocsAdapter,
  });

  return data;
};

export const getEmployeeHistoryFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_HISTORY({ id });

  const data = await fetchFn<API_GetHistory[], History[]>({
    request,
    adapter: getEmployeeHistoryFn,
  });

  return data;
};

export const postEmployeeFn = async (body: FormData) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE();

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};

export const postFileFn = async ({
  employeeId,
  body,
}: {
  employeeId: string;
  body: FormData;
}) => {
  const request = apiRoutes.EMPLOYEES.POST_FILE({ employeeId });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body,
  });

  return data;
};

export const putFileFn = async ({
  employeeId,
  fileId,
  body,
}: {
  employeeId: string;
  fileId: string;
  body: Record<string, unknown>;
}) => {
  const request = apiRoutes.EMPLOYEES.PUT_FILE({ fileId, employeeId });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    body,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const deleteFileFn = async ({
  employeeId,
  fileId,
}: {
  employeeId: string;
  fileId: string;
}) => {
  const request = apiRoutes.EMPLOYEES.DELETE_FILE({ fileId, employeeId });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};
