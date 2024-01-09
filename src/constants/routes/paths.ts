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
    ADMIN_TYPES: '/notifications/admin-types',
    DETAILS: '/notifications/:id',
    SENT: '/notifications/sent',
  },
  USERS: {
    MAIN: '/users',
  },
  SETTINGS: {
    MAIN: '/settings',
  },
};
