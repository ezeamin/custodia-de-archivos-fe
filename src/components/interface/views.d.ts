import { ModalStore } from '@/stores/useModal';

import {
  Absence,
  Beneficiary,
  Employee,
  EmployeeDoc,
  EmployeeFolder,
  ExtraHours,
  FamilyMember,
  FormalWarning,
  History,
  LateArrival,
  License,
  LicenseType,
  MinimalEmployee,
  MinimalFamilyMember,
  Training,
  TrainingType,
  Vacation,
} from '@/api/interface/employees';
import {
  Notification,
  NotificationFile,
  NotificationsAreaReceiver,
  NotificationType,
  SentNotification,
} from '@/api/interface/notifications';
import { BasicUser, LoginLog, ReadOnlyUser } from '@/api/interface/users';

// --------------------------------------------------
// EMPLOYEES
// --------------------------------------------------

export interface SearchFilterProps {
  queryKey: string | unknown[];
  placeholder?: string;
  className?: string;
  defaultEntries?: number;
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

export interface BeneficiaryFormProps {
  beneficiaryOriginalData?: Beneficiary;
}

export interface BeneficiariesListProps {
  data: Beneficiary[];
  lifeInsuranceId: string;
}

export interface BeneficiaryItemProps {
  beneficiary: Beneficiary;
  lifeInsuranceId: string;
}

export interface FamilyListProps {
  data: MinimalFamilyMember[];
}

export interface FamilyButtonProps {
  member: MinimalFamilyMember;
}

export interface FamilyModalData extends ModalStore {
  data: string;
}

export interface FamilyMemberFormProps {
  memberOriginalData?: FamilyMember;
}

export interface FamilyInfoModalContentProps {
  data: FamilyMember;
}

export interface EditDocumentsFormProps {
  data: EmployeeFolder[];
}

export interface FolderItemProps {
  folder: EmployeeFolder | undefined;
}

export interface DocumentItemProps {
  doc: EmployeeDoc | undefined;
}

export interface DocumentListModalData extends ModalStore {
  data: {
    documents: EmployeeDoc[];
  };
}

export interface NewFolderModalData extends ModalStore {
  data: {
    employeeId: string;
    folder: {
      id: string;
      name: string;
      color: string;
    };
  } | null;
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
    username: string;
    password: string;
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

export interface PersonalProps {
  data: Employee | null;
}

export interface LifeInsurancesListProps {
  data: Employee['lifeInsurances'];
}

export interface LifeInsuranceButtonProps {
  data: Employee['lifeInsurances'][0];
}

export interface LifeInsuranceModalData extends ModalStore {
  data: Employee['lifeInsurances'][0];
}

export interface LifeInsuranceInfoPanelProps {
  data: Employee['lifeInsurances'][0];
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export interface LifeInsuranceEditPanelProps {
  data: Employee['lifeInsurances'][0];
  onFinishEdit: () => void;
}

export interface BeneficiariesProps {
  employeeId: string;
  isEditing: boolean;
  lifeInsurance: Employee['lifeInsurances'][0];
}

export interface DriversLicenseProps {
  data: Employee['driversLicenseDate'];
  short?: boolean;
}

export interface FitMessageProps {
  data: Employee['preoccupationalCheckup'] | null;
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
  data: (Notification | SentNotification)[];
  hasBeenRead?: boolean;
  sent?: boolean;
}

export interface NotificationsResultsListItemProps {
  notification: Notification | SentNotification;
  index: number;
  hasBeenRead: boolean;
  sent?: boolean;
}

export interface NotificationInfoProps {
  data: Notification | SentNotification;
  sent?: boolean;
  showReadAlert?: boolean;
}

export interface NotificationInfoContentProps {
  data: Notification | SentNotification;
  sent?: boolean;
}

export interface NotificationFileItemProps {
  file: NotificationFile;
}

export interface ReceiverItemProps {
  data: SentNotification['receivers'][0];
}

export interface IssuerItemProps {
  data: Notification['issuer'];
}

export interface ModalNotificacionAreaReceiver extends ModalStore {
  data: { areaId: string };
}

export interface AreaReceiverItemProps {
  receiver: NotificationsAreaReceiver;
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

export interface AreaResultsListProps {
  data: Area[];
}

export interface AreaResultsListItemProps {
  area: Area;
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
