import { ModalStore } from '@/stores/useModal';

import {
  Absence,
  Employee,
  EmployeeDoc,
  History,
  LateArrival,
  License,
  MinimalEmployee,
} from '@/api/interface/employees';
import {
  Notification,
  NotificationFile,
  NotificationType,
} from '@/api/interface/notifications';

// --------------------------------------------------
// EMPLOYEES
// --------------------------------------------------

export interface EmployeesResultsTableProps {
  data: MinimalEmployee[];
}

export interface EmployeesResultsTableRowProps {
  employee: MinimalEmployee;
}

export interface EmployeesResultsListProps extends EmployeesResultsTableProps {}
export interface EmployeesResultsListItemProps
  extends EmployeesResultsTableRowProps {
  index: number;
}

export interface EmployeeStatusProps {
  status: MinimalEmployee['status'];
  expanded?: boolean;
  className?: string;
  noBadge?: boolean;
}

export interface EmployeeInfoProps {
  data: Employee;
}

export interface EmployeeDataFieldProps {
  label: string;
  value: string | number | React.ReactNode | undefined | null;
  className?: string;
}

export interface EditDocumentsFormProps {
  data: EmployeeDoc[];
}

export interface DocumentItemProps {
  doc: EmployeeDoc | undefined;
}

export interface ChangeDocModalData extends ModalStore {
  data: {
    employeeId: string;
    doc: {
      id: string;
      name: string;
    };
  };
}

export interface NewUserModalData extends ModalStore {
  data: {
    data: {
      username: string;
      password: string;
    };
  };
}

export interface HistoryDataProps {
  data: History[];
}

export interface HistoryElementProps {
  data: History;
}

export interface AddNewProps {
  disabled?: boolean;
  modalName: string;
}

export interface AbsenceProps {
  data: Absence[];
}

export interface AbsenceElementProps {
  data: Absence;
}

export interface LateArrivalsProps {
  data: LateArrival[];
}

export interface LateArrivalsElementProps {
  data: LateArrival;
}

export interface LicensesProps {
  data: License[];
}

export interface LicensesElementProps {
  data: License;
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
