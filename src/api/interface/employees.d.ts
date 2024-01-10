// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_Address {
  street: string;
  number: number;
  apt: number | null;
  city: string;
  state: string;
  country: string;
}

export interface API_GetEmployees {
  id: string;
  dni: string;
  imgSrc: string;
  lastname: string;
  firstname: string;
  age: number;
  antiquity: number;
  position: string;
  area: {
    id: string;
    description: string;
  };
  fileNumber: number;
  status: {
    id: string;
    description: 'active' | 'suspended' | 'inactive' | 'deleted';
  };
}

export interface API_GetEmployee extends API_GetEmployees {
  birthdate: string;
  address: API_Address;
  phone: string;
  email: string;
  gender: {
    id: string;
    description: string;
  };
  registrationDate: string;
  departureDate: string | null;
  user: {
    id: string;
  } | null;
}

export interface API_GetEmployeeDocs {
  id: string;
  name: string;
  url: string;
}

export interface API_GetHistory {
  id: string;
  previousValue: string;
  newValue: string;
  field: string;
  date: string;
  user: {
    id: string;
    description: string;
  };
}

export interface API_PostUser {
  username: string;
  password: string;
}

export interface API_GetAbsences {
  id: string;
  date: string;
  reason: string;
}

export interface API_GetVacations {
  id: string;
  startDate: string;
  endDate: string;
}

export interface API_GetLicenses {
  id: string;
  startDate: string;
  endDate: string;
  type: {
    id: string;
    description: string;
  };
}

export interface API_GetLicensesTypes {
  id: string;
  description: string;
}

export interface API_GetFormalWarnings {
  id: string;
  date: string;
  reason: string;
}

export interface API_GetTrainings {
  id: string;
  date: string;
  reason: string;
  type: {
    id: string;
    description: string;
  };
}

export interface API_GetTrainingsTypes {
  id: string;
  description: string;
}

export interface API_GetLateArrivals {
  id: string;
  date: string;
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface MinimalEmployee extends API_GetEmployees {}
export interface Employee extends API_GetEmployee {}
export interface EmployeeDoc extends API_GetEmployeeDocs {}
export interface History extends API_GetHistory {}
export interface User extends API_PostUser {}
export interface Absence extends API_GetAbsences {}
export interface Vacation extends API_GetVacations {}
export interface License extends API_GetLicenses {}
export interface LicenseType extends API_GetLicensesTypes {}
export interface FormalWarning extends API_GetFormalWarnings {}
export interface Training extends API_GetTrainings {}
export interface TrainingType extends API_GetTrainingsTypes {}
export interface LateArrival extends API_GetLateArrivals {}
