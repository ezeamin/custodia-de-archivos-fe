import { fetchFn } from '../fetchFn';

import { apiRoutes } from '@/api/routes/apiRoutes';

import { cleanUpDataToSend } from '@/utilities/utils';

import {
  getEmployeeAbsencesAdapter,
  getEmployeeAdapter,
  getEmployeeDocsAdapter,
  getEmployeeExtraHoursAdapter,
  getEmployeeFormalWarningsAdapter,
  getEmployeeLateArrivalsAdapter,
  getEmployeeLicensesAdapter,
  getEmployeeLicensesTypesAdapter,
  getEmployeeLicenseTypeAdapter,
  getEmployeesAdapter,
  getEmployeeTrainingsAdapter,
  getEmployeeTrainingTypesAdapter,
  getEmployeeVacationsAdapter,
} from '../adapters/employees';

import { API_EmptyResponse } from '../interface';
import {
  Absence,
  API_GetAbsences,
  API_GetEmployee,
  API_GetEmployeeDocs,
  API_GetEmployees,
  API_GetExtraHours,
  API_GetFormalWarnings,
  API_GetHistory,
  API_GetLateArrivals,
  API_GetLicenses,
  API_GetLicensesTypes,
  API_GetTrainings,
  API_GetTrainingsTypes,
  API_GetVacations,
  Employee,
  EmployeeDoc,
  ExtraHours,
  FormalWarning,
  History,
  LateArrival,
  License,
  LicenseType,
  MinimalEmployee,
  Training,
  TrainingType,
  Vacation,
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

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
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

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
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

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    body: dataToSend,
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

export const getEmployeeAbsencesFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_ABSENCES({ id });

  const data = await fetchFn<API_GetAbsences[], Absence[]>({
    request,
    adapter: getEmployeeAbsencesAdapter,
  });

  return data;
};

export const getEmployeeVacationsFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_VACATIONS({ id });

  const data = await fetchFn<API_GetVacations[], Vacation[]>({
    request,
    adapter: getEmployeeVacationsAdapter,
  });

  return data;
};

export const getEmployeeLicensesFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_LICENSES({ id });

  const data = await fetchFn<API_GetLicenses[], License[]>({
    request,
    adapter: getEmployeeLicensesAdapter,
  });

  return data;
};

export const getEmployeeLicensesTypesFn = async () => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_LICENSES_TYPES();

  const data = await fetchFn<API_GetLicensesTypes[], LicenseType[]>({
    request,
    adapter: getEmployeeLicensesTypesAdapter,
  });

  return data;
};

export const getEmployeeLicenseTypeFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_LICENSE_TYPE({ id });

  const data = await fetchFn<API_GetLicensesTypes, LicenseType>({
    request,
    adapter: getEmployeeLicenseTypeAdapter,
  });

  return data;
};

export const getEmployeeFormalWarningsFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_FORMAL_WARNINGS({ id });

  const data = await fetchFn<API_GetFormalWarnings[], FormalWarning[]>({
    request,
    adapter: getEmployeeFormalWarningsAdapter,
  });

  return data;
};

export const getEmployeeTrainingsFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_TRAININGS({ id });

  const data = await fetchFn<API_GetTrainings[], Training[]>({
    request,
    adapter: getEmployeeTrainingsAdapter,
  });

  return data;
};

export const getEmployeeTrainingsTypesFn = async () => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_TRAININGS_TYPES();

  const data = await fetchFn<API_GetTrainingsTypes[], TrainingType[]>({
    request,
    adapter: getEmployeeTrainingTypesAdapter,
  });

  return data;
};

export const getEmployeeTrainingTypeFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_TRAINING_TYPE({ id });

  const data = await fetchFn<API_GetTrainingsTypes, TrainingType>({
    request,
    adapter: getEmployeeTrainingTypesAdapter,
  });

  return data;
};

export const getEmployeeLateArrivalsFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_LATE_ARRIVALS({ id });

  const data = await fetchFn<API_GetLateArrivals[], LateArrival[]>({
    request,
    adapter: getEmployeeLateArrivalsAdapter,
  });

  return data;
};

export const getEmployeeExtraHoursFn = async (id: string) => {
  const request = apiRoutes.EMPLOYEES.GET_EMPLOYEE_EXTRA_HOURS({ id });

  const data = await fetchFn<API_GetExtraHours[], ExtraHours[]>({
    request,
    adapter: getEmployeeExtraHoursAdapter,
  });

  return data;
};

export const postEmployeeAbsenceFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_ABSENCE();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const postEmployeeLateArrivalFn = async (
  body: Record<string, unknown>
) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_LATE_ARRIVAL();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const postEmployeeLicenseFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_LICENSE();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const deleteEmployeeLicenseFn = async ({
  employeeId,
  licenseId,
}: {
  employeeId: string;
  licenseId: string;
}) => {
  const request = apiRoutes.EMPLOYEES.DELETE_EMPLOYEE_LICENSE({
    employeeId,
    licenseId,
  });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const postEmployeeExtraHoursFn = async (
  body: Record<string, unknown>
) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_EXTRA_HOURS();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const postEmployeeVacationFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_VACATION();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const deleteEmployeeVacationsFn = async ({
  employeeId,
  vacationsId,
}: {
  employeeId: string;
  vacationsId: string;
}) => {
  const request = apiRoutes.EMPLOYEES.DELETE_EMPLOYEE_VACATIONS({
    employeeId,
    vacationsId,
  });

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
  });

  return data;
};

export const postEmployeeFormalWarningFn = async (
  body: Record<string, unknown>
) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_FORMAL_WARNING();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};

export const postEmployeeTrainingFn = async (body: Record<string, unknown>) => {
  const request = apiRoutes.EMPLOYEES.POST_EMPLOYEE_TRAINING();

  const dataToSend = cleanUpDataToSend(body);

  const data = await fetchFn<API_EmptyResponse>({
    request,
    adapter: (APIData) => APIData,
    body: dataToSend,
  });

  return data;
};
