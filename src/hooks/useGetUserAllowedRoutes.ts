import { useSession } from '@/stores/useSession';

import {
  adminRoutes,
  employeeRoutes,
  readOnlyRoutes,
} from '@/constants/routes/routes';
import { userRoles } from '@/constants/userRoles/userRoles';

import { Route } from '@/constants/interface';

const useGetUserAllowedRoutes = (): Route[] => {
  const { user } = useSession();

  const userRole = user?.role;

  switch (userRole) {
    case userRoles.ADMIN:
      return adminRoutes;
    case userRoles.EMPLOYEE:
      return employeeRoutes;
    case userRoles.THIRD_PARTY:
      return readOnlyRoutes;
    default:
      return [];
  }
};

export default useGetUserAllowedRoutes;
