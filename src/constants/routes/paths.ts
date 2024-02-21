export const paths = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    RECOVER_PASS: '/auth/recover-password',
    RESET_PASS: '/auth/reset-password',
  },
  EMPLOYEES: {
    MAIN: '/employees',
    EMPLOYEE_DETAILS: '/employees/:id/:tab',
    EMPLOYEE_DETAILS_EDIT: '/employees/:id/edit/:subtab',
    EMPLOYEE_FAMILY_CREATE: '/employees/:id/family',
    EMPLOYEE_FAMILY_EDIT: '/employees/:id/family/:memberId',
    EMPLOYEE_LIFE_INSURANCE_BENEFICIARY_CREATE:
      '/employees/:id/life-insurance/:lifeInsuranceId/beneficiary',
    EMPLOYEE_LIFE_INSURANCE_BENEFICIARY_EDIT:
      '/employees/:id/life-insurance/:lifeInsuranceId/beneficiary/:beneficiaryId',
    CREATE: '/employees/create',
  },
  NOTIFICATIONS: {
    MAIN: '/notifications',
    CREATE: '/notifications/create',
    READ: '/notifications/read',
    DETAILS: '/notifications/:id',
    SENT: '/notifications/sent',
    SENT_DETAILS: '/notifications/sent/:id',
  },
  TYPES_LIST: {
    MAIN: '/types-list',
    NOTIFICATIONS: '/types-list/notification-types',
    LICENSES: '/types-list/license-types',
    TRAININGS: '/types-list/training-types',
    AREAS: '/types-list/areas-types',
  },
  SETTINGS: {
    MAIN: '/settings',
    CHANGE_PASSWORD: '/settings/change-password',
    LOGIN_LOGS: '/settings/login-logs',
    MAKE_ADMIN: '/settings/make-admin',
    REMOVE_ADMIN: '/settings/remove-admin',
    MAKE_READ_ONLY: '/settings/make-read-only',
    REMOVE_READ_ONLY: '/settings/remove-read-only',
  },
};
