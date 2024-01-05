import { UserRole } from '@/constants/userRoles/userRoles';

export interface PrivateRouteProps {
  element: JSX.Element;
  privateRoute: boolean;
  allowedRoles: UserRole[];
}
