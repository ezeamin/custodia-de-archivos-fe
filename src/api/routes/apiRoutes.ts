import { ApiRoute } from '../interface/routes';

export const apiRoutes = {
  PARAMS: {
    GET_ROLES: (): ApiRoute => ({
      method: 'GET',
      url: '/params/roles',
    }),
    GET_GENDERS: (): ApiRoute => ({
      method: 'GET',
      url: '/params/genders',
    }),
    GET_AREAS: (): ApiRoute => ({
      method: 'GET',
      url: '/params/areas',
    }),
  },
  EMPLOYEES: {
    GET_EMPLOYEES: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees${params}`,
    }),
    GET_EMPLOYEE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}`,
    }),
    GET_EMPLOYEE_DOCS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/docs`,
    }),
    POST_EMPLOYEE: (): ApiRoute => ({
      method: 'POST',
      url: '/employees',
    }),
    POST_FILE: ({ employeeId }: { employeeId: string }): ApiRoute => ({
      method: 'POST',
      url: `/employees/${employeeId}/docs`,
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
    }),
    GET_EMPLOYEE_HISTORY: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/history`,
    }),
    POST_USER: (): ApiRoute => ({
      method: 'POST',
      url: `/employees/users`,
    }),
    GET_EMPLOYEE_ABSENCES: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/absences`,
    }),
    GET_EMPLOYEE_ABSENCE: ({
      employeeId,
      absenceId,
    }: {
      employeeId: string;
      absenceId: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${employeeId}/absences/${absenceId}`,
    }),
    GET_EMPLOYEE_LICENCES: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/licences`,
    }),
    GET_EMPLOYEE_LICENSE: ({
      employeeId,
      licenseId,
    }: {
      employeeId: string;
      licenseId: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${employeeId}/licences/${licenseId}`,
    }),
    GET_EMPLOYEE_LICENCES_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: `/employees/licences/types`,
    }),
    GET_EMPLOYEE_VACATIONS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/vacations`,
    }),
    GET_EMPLOYEE_VACATION: ({
      employeeId,
      vacationId,
    }: {
      employeeId: string;
      vacationId: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${employeeId}/vacations/${vacationId}`,
    }),
    GET_EMPLOYEE_FORMAL_WARNINGS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/formal-warnings`,
    }),
    GET_EMPLOYEE_FORMAL_WARNING: ({
      employeeId,
      formalWarningId,
    }: {
      employeeId: string;
      formalWarningId: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${employeeId}/formal-warnings/${formalWarningId}`,
    }),
    GET_EMPLOYEE_TRAININGS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/trainings`,
    }),
    GET_EMPLOYEE_TRAINING: ({
      employeeId,
      trainingId,
    }: {
      employeeId: string;
      trainingId: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${employeeId}/trainings/${trainingId}`,
    }),
    GET_EMPLOYEE_TRAININGS_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: `/employees/trainings/types`,
    }),
    GET_EMPLOYEE_LATE_ARRIVALS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/late-arrivals`,
    }),
    GET_EMPLOYEE_LATE_ARRIVAL: ({
      employeeId,
      lateArrivalId,
    }: {
      employeeId: string;
      lateArrivalId: string;
    }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${employeeId}/late-arrivals/${lateArrivalId}`,
    }),
    GET_EMPLOYEE_EXTRA_HOURS: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/employees/${id}/extra-hours`,
    }),
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: ({ params }: { params: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications${params}`,
    }),
    GET_NOTIFICATION: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications/${id}`,
    }),
    POST_NOTIFICATION: (): ApiRoute => ({
      method: 'POST',
      url: '/notifications',
    }),
    READ_NOTIFICATION: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/notifications/${id}/read`,
    }),
    GET_NOTIFICATION_RECEIVERS: (): ApiRoute => ({
      method: 'GET',
      url: '/notifications/receivers',
    }),
    GET_NOTIFICATION_ROLES: (): ApiRoute => ({
      method: 'GET',
      url: '/notifications/receivers',
    }),
    GET_NOTIFICATION_TYPES: (): ApiRoute => ({
      method: 'GET',
      url: '/notifications/types',
    }),
    GET_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'GET',
      url: `/notifications/types/${id}`,
    }),
    POST_NOTIFICATION_TYPE: (): ApiRoute => ({
      method: 'POST',
      url: '/notifications/types',
    }),
    PUT_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'PUT',
      url: `/notifications/types/${id}`,
    }),
    DELETE_NOTIFICATION_TYPE: ({ id }: { id: string }): ApiRoute => ({
      method: 'DELETE',
      url: `/notifications/types/${id}`,
    }),
  },
};
