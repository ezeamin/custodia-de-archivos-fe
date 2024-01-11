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
    CREATE: '/employees/create',
  },
  NOTIFICATIONS: {
    MAIN: '/notifications',
    CREATE: '/notifications/create',
    HISTORY: '/notifications/history',
    DETAILS: '/notifications/:id',
    SENT: '/notifications/sent',
  },
  TYPES_LIST: {
    MAIN: '/types-list',
    NOTIFICATIONS: '/types-list/notification-types',
    LICENSES: '/types-list/license-types',
    TRAININGS: '/types-list/training-types',
  },
  SETTINGS: {
    MAIN: '/settings',
  },
};
