import { ApiRoute } from '../interface/routes';

export const apiRoutes = {
  PARAMS: {
    GET_STATUS: (): ApiRoute => ({
      method: 'GET',
      url: '/params/status',
      useToken: true,
    }),
    GET_ROLES: (): ApiRoute => ({
      method: 'GET',
      url: '/params/roles',
      useToken: true,
    }),
    GET_GENDERS: (): ApiRoute => ({
      method: 'GET',
      url: '/params/genders',
      useToken: true,
    }),
    GET_AREAS: (): ApiRoute => ({
      method: 'GET',
      url: '/params/areas',
      useToken: true,
    }),
  },
  AUTH: {
    POST_LOGIN: (): ApiRoute => ({
      method: 'POST',
      url: '/auth/login',
      credentials: 'include',
    }),
    POST_REFRESH_TOKEN: (): ApiRoute => ({
      method: 'POST',
      url: '/auth/refresh-token',
      credentials: 'include',
    }),
    POST_LOGOUT: (): ApiRoute => ({
      method: 'POST',
      url: '/auth/logout',
      credentials: 'include',
      useToken: true,
    }),
    POST_RECOVER_PASS: (): ApiRoute => ({
      method: 'POST',
      url: '/auth/recover-password',
    }),
    PUT_RESET_PASS: (): ApiRoute => ({
      method: 'PUT',
      url: '/auth/reset-password',
    }),
  },
  USERS: {
    GET_USERS: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/users${params}`,
      useToken: true,
    }),
    POST_USER: (): ApiRoute => ({
      method: 'POST',
      url: `/users`,
      useToken: true,
    }),
    PUT_CREATE_ADMIN: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/users/create-admin/${id}`,
      useToken: true,
    }),
    DELETE_ADMIN: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/users/delete-admin/${id}`,
      useToken: true,
    }),
    POST_READ_ONLY_USER: (): ApiRoute => ({
      method: 'POST',
      url: `/users/create-read-only`,
      useToken: true,
    }),
    DELETE_READ_ONLY_USER: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/users/delete-read-only/${id}`,
      useToken: true,
    }),
    GET_LOGIN_LOGS: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/users/login-logs${params}`,
      useToken: true,
    }),
  },
  EMPLOYEES: {
    GET_EMPLOYEES: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees${params}`,
      useToken: true,
    }),
    GET_EMPLOYEE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}`,
      useToken: true,
    }),
    GET_EMPLOYEE_DOCS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/docs`,
      useToken: true,
    }),
    POST_EMPLOYEE: (): ApiRoute => ({
      method: 'POST',
      url: '/employees',
      useToken: true,
    }),
    EDIT_EMPLOYEE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/employees/${id}`,
      useToken: true,
    }),
    EDIT_EMPLOYEE_IMAGE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/employees/${id}/image`,
      useToken: true,
    }),
    POST_FILE: ({ employeeId }: { employeeId: string }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/docs`,
      useToken: true,
    }),
    PUT_FILE: ({
      employeeId,
      fileId,
    }: {
      employeeId: string;
      fileId: string;
    }): ApiRoute => ({
      method: 'PUT',
      url: `/employees/${employeeId}/docs/${fileId}`,
      useToken: true,
    }),
    DELETE_FILE: ({
      employeeId,
      fileId,
    }: {
      employeeId: string;
      fileId: string;
    }): ApiRoute => ({
      method: 'DELETE',
      url: `/employees/${employeeId}/docs/${fileId}`,
      useToken: true,
    }),
    GET_EMPLOYEE_HISTORY: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/history`,
      useToken: true,
    }),
    GET_EMPLOYEE_ABSENCES: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/absences`,
      useToken: true,
    }),
    POST_EMPLOYEE_ABSENCE: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/absences`,
      useToken: true,
    }),
    GET_EMPLOYEE_LICENSES: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/licenses`,
      useToken: true,
    }),
    GET_EMPLOYEE_LICENSES_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: `/employees/licenses/types`,
      useToken: true,
    }),
    GET_EMPLOYEE_LICENSE_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/licenses/types/${id}`,
      useToken: true,
    }),
    POST_EMPLOYEE_LICENSE: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/licenses`,
      useToken: true,
    }),
    DELETE_EMPLOYEE_LICENSE: ({
      employeeId,
      licenseId,
    }: {
      employeeId: string;
      licenseId: string;
    }): ApiRoute => ({
      method: 'DELETE',
      url: `/employees/${employeeId}/licenses/${licenseId}`,
      useToken: true,
    }),
    POST_EMPLOYEE_LICENSE_TYPE: (): ApiRoute => ({
      method: 'POST',
      url: `/employees/licenses/types`,
      useToken: true,
    }),
    PUT_EMPLOYEE_LICENSE_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/employees/licenses/types/${id}`,
      useToken: true,
    }),
    DELETE_EMPLOYEE_LICENSE_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/employees/licenses/types/${id}`,
      useToken: true,
    }),
    GET_EMPLOYEE_VACATIONS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/vacations`,
      useToken: true,
    }),
    POST_EMPLOYEE_VACATION: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/vacations`,
      useToken: true,
    }),
    DELETE_EMPLOYEE_VACATIONS: ({
      employeeId,
      vacationsId,
    }: {
      employeeId: string;
      vacationsId: string;
    }): ApiRoute => ({
      method: 'DELETE',
      url: `/employees/${employeeId}/vacations/${vacationsId}`,
      useToken: true,
    }),
    GET_EMPLOYEE_FORMAL_WARNINGS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/formal-warnings`,
      useToken: true,
    }),
    POST_EMPLOYEE_FORMAL_WARNING: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/formal-warnings`,
      useToken: true,
    }),
    GET_EMPLOYEE_TRAININGS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/trainings`,
      useToken: true,
    }),
    GET_EMPLOYEE_TRAININGS_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: `/employees/trainings/types`,
      useToken: true,
    }),
    GET_EMPLOYEE_TRAINING_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/trainings/types/${id}`,
      useToken: true,
    }),
    POST_EMPLOYEE_TRAINING_TYPE: (): ApiRoute => ({
      method: 'POST',
      url: `/employees/trainings/types`,
      useToken: true,
    }),
    PUT_EMPLOYEE_TRAINING_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/employees/trainings/types/${id}`,
      useToken: true,
    }),
    DELETE_EMPLOYEE_TRAINING_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/employees/trainings/types/${id}`,
      useToken: true,
    }),
    POST_EMPLOYEE_TRAINING: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/trainings`,
      useToken: true,
    }),
    GET_EMPLOYEE_LATE_ARRIVALS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/late-arrivals`,
      useToken: true,
    }),
    POST_EMPLOYEE_LATE_ARRIVAL: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/late-arrivals`,
      useToken: true,
    }),
    GET_EMPLOYEE_EXTRA_HOURS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/extra-hours`,
      useToken: true,
    }),
    POST_EMPLOYEE_EXTRA_HOURS: ({
      employeeId,
    }: {
      employeeId: string;
    }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/extra-hours`,
      useToken: true,
    }),
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications${params}`,
      useToken: true,
    }),
    GET_NOTIFICATION: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications/${id}`,
      useToken: true,
    }),
    POST_NOTIFICATION: (): ApiRoute => ({
      method: 'POST',
      url: '/notifications',
      useToken: true,
    }),
    READ_NOTIFICATION: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/notifications/${id}/read`,
      useToken: true,
    }),
    GET_NOTIFICATION_RECEIVERS: (): ApiRoute => ({
      method: 'GET',
      url: '/notifications/receivers',
      useToken: true,
    }),
    GET_NOTIFICATION_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: '/notifications/types',
      useToken: true,
    }),
    GET_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications/types/${id}`,
      useToken: true,
    }),
    POST_NOTIFICATION_TYPE: (): ApiRoute => ({
      method: 'POST',
      url: '/notifications/types',
      useToken: true,
    }),
    PUT_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/notifications/types/${id}`,
      useToken: true,
    }),
    DELETE_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/notifications/types/${id}`,
      useToken: true,
    }),
  },
};
