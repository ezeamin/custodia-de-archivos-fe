import { ModalStore } from '@/stores/useModal';

import {
  Absence,
  Employee,
  EmployeeDoc,
  ExtraHours,
  FormalWarning,
  History,
  LateArrival,
  License,
  LicenseType,
  MinimalEmployee,
  Training,
  TrainingType,
  Vacation,
} from '@/api/interface/employees';
import {
  Notification,
  NotificationFile,
  NotificationType,
} from '@/api/interface/notifications';
import { BasicUser, LoginLog, ReadOnlyUser } from '@/api/interface/users';

// --------------------------------------------------
// EMPLOYEES
// --------------------------------------------------

export interface SearchFilterProps {
  queryKey: string;
  placeholder?: string;
}

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

export interface ObservationsMessageProps {
  id: string;
}

export interface AbsencesProps {
  data: Absence[];
}

export interface AbsencesElementProps {
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

export interface ExtraHoursProps {
  data: ExtraHours[];
}

export interface ExtraHoursElementProps {
  data: ExtraHours;
}

export interface VacationsProps {
  data: Vacation[];
}

export interface VacationsElementProps {
  data: Vacation;
}

export interface FormalWarningsProps {
  data: FormalWarning[];
}

export interface FormalWarningsElementProps {
  data: FormalWarning;
}

export interface TrainingsProps {
  data: Training[];
}

export interface TrainingsElementProps {
  data: Training;
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

// --------------------------------------------------
// TYPES LIST
// --------------------------------------------------

export interface RoutingCardProps {
  route: {
    id: number;
    path: string;
    name: string;
    allowedRoles?: string[];
  };
  index: number;
  showType?: boolean;
}

export interface NotificationsTypeResultsListProps {
  data: NotificationType[];
}

export interface NotificationsTypeResultsListItemProps {
  notificationType: NotificationType;
  index: number;
}
export interface LicensesTypesResultsListProps {
  data: LicenseType[];
}

export interface LicensesTypesResultsListItemProps {
  licenseType: LicenseType;
  index: number;
}

export interface TrainingTypesResultsListProps {
  data: TrainingType[];
}

export interface TrainingTypesResultsListItemProps {
  trainingType: TrainingType;
  index: number;
}

// --------------------------------------------------
// SETTINGS
// --------------------------------------------------

export interface LoginLogsResults {
  data: LoginLog[];
}

export interface LoginLogsResultsElement {
  log: LoginLog;
  index?: number;
}

export interface CreateAdminResults {
  data: BasicUser[];
}

export interface CreateAdminResultsElement {
  user: BasicUser;
  index?: number;
}

export interface DeleteReadOnlyUserResults {
  data: ReadOnlyUser[];
}

export interface DeleteReadOnlyUserResultsElement {
  user: ReadOnlyUser;
  index?: number;
}
