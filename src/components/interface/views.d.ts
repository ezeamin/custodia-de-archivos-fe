import { Employee } from '@/api/interface/employees';
import { Notification, NotificationType } from '@/api/interface/notifications';

// --------------------------------------------------
// EMPLOYEES
// --------------------------------------------------

export interface FilterModalFormProps {
  closeModal: () => void;
}

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
