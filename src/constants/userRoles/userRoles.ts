export const userRoles = {
  ADMIN: 'ADMIN',
  THIRD_PARTY: 'THIRD_PARTY',
  EMPLOYEE: 'EMPLOYEE',
  AREA: 'AREA',
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
