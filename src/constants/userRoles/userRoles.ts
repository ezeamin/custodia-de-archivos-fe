export const userRoles = {
  ADMIN: 'ADMIN',
  READ_ONLY: 'READ_ONLY',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export type UserRole = (typeof userRoles)[keyof typeof userRoles];
