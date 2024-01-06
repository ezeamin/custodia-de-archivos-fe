import { Employee } from '@/api/interface/employees';
import {
  Notification,
  NotificationFile,
  NotificationType,
} from '@/api/interface/notifications';

// --------------------------------------------------
// EMPLOYEES
// --------------------------------------------------

export interface EmployeesResultsTableProps {
  data: Employee[];
}

export interface EmployeesResultsTableRowProps {
  employee: Employee;
}

export interface EmployeesResultsListProps extends EmployeesResultsTableProps {}
export interface EmployeesResultsListItemProps
  extends EmployeesResultsTableRowProps {
  index: number;
}

export interface EmployeeStatusProps {
  status: Employee['status'];
}

// --------------------------------------------------
// NOTIFICATIONS
// --------------------------------------------------

export interface NotificationsResultsListProps {
  data: Notification[];
  hasBeenRead?: boolean;
}

export interface NotificationsResultsListItemProps {
  notification: Notification;
  index: number;
  hasBeenRead: boolean;
}

export interface NotificationsTypeResultsListProps {
  data: NotificationType[];
}

export interface NotificationsTypeResultsListItemProps {
  notificationType: NotificationType;
  index: number;
}

export interface NotificationInfoProps {
  data: Notification;
  showReadAlert: boolean;
  isLoadingRead: boolean;
}

export interface NotificationInfoContentProps {
  data: Notification;
}

export interface NotificationFileItemProps {
  file: NotificationFile;
}
