// --------------------------------------------------
// EMPLOYEES
// --------------------------------------------------
import { Employee } from '@/api/interface/employees';

export interface FilterModalFormProps {
  closeModal: () => void;
}

export interface ResultsTableProps {
  data: Employee[];
}

export interface ResultsTableRowProps {
  employee: Employee;
}

export interface ResultsListProps extends ResultsTableProps {}
export interface ResultsListItemProps extends ResultsTableRowProps {}

export interface EmployeeStatusProps {
  status: Employee['status'];
}
