import { BasicList } from '@/interface';

// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_Address {
  street: BasicList;
  streetNumber: number;
  apt: string | null;
  state: BasicList;
  locality: BasicList;
  observations: string | null;
}

export interface API_GetBeneficiary {
  id: string;
  name: string;
  lastname: string;
  gender: {
    id: string;
    description: string;
  };
  cuil: string;
  relationship: {
    id: string;
    description: string;
  };
  address: API_Address | null;
  percentage: number;
}

export interface API_MinimalFamilyMember {
  id: string;
  name: string;
  relationship: string;
}

export interface API_GetEmployees {
  id: string;
  cuil: string;
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
  driversLicenseDate: string | null;
  status: {
    id: string;
    description: 'active' | 'suspended' | 'inactive' | 'deleted';
  };
}

export interface API_GetEmployee extends API_GetEmployees {
  birthdate: string;
  address: API_Address;
  familyMembers: API_MinimalFamilyMember[];
  civilStatus: BasicList;
  phone: string;
  email: string;
  workingHours: number;
  gender: BasicList;
  startDate: string;
  endDate: string | null;
  healthInsurance: {
    id: string;
    name: string;
    affiliateNumber: string;
  } | null;
  lifeInsurances: {
    id: string;
    name: string;
    policyNumber: string;
    beneficiaries: API_GetBeneficiary[];
  }[];
  preoccupationalCheckup: {
    fit: boolean;
    observations: string;
  } | null;
  user: {
    id: string;
  } | null;
}

export interface API_GetFamilyMember {
  id: string;
  name: string;
  lastname: string;
  cuil: string;
  gender: BasicList;
  relationship: BasicList;
  phone: string;
  address: API_Address;
}

export interface API_PostEmployee {
  body: Record<string, string>;
  name: string;
  lastname: string;
  cuil: string;
  phone: string | null;
  address: string | null;
}

export interface API_PostFamilyMember {
  name: string;
  lastname: string;
  cuil: string;
  phone: string | null;
  address: string | null;
}

export interface API_PostBeneficiary {
  name: string;
  lastname: string;
  cuil: string;
  gender: string;
  address: string | null;
}

export interface API_EmployeeDocs {
  id: string;
  name: string;
  url: string;
}

export interface API_GetEmployeeDocs {
  id: string;
  name: string;
  color: `#${string}`;
  documents: API_EmployeeDocs[];
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
export interface API_GetAbsences {
  id: string;
  date: string;
  reason: string;
}

export interface API_GetVacations {
  id: string;
  startDate: string;
  endDate: string;
  observations?: string;
}

export interface API_GetLicenses {
  id: string;
  startDate: string;
  endDate: string;
  type: {
    id: string;
    description: string;
  };
  observations?: string;
}

export interface API_GetLicensesTypes {
  id: string;
  title: string;
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
  observations?: string;
}

export interface API_GetTrainingsTypes {
  id: string;
  title: string;
  description: string;
}

export interface API_GetLateArrivals {
  id: string;
  date: string;
  time: string;
  observations?: string;
}

export interface API_GetExtraHours {
  id: string;
  date: string;
  hours: number;
  observations?: string;
}

export interface API_GetStates {
  provincias: {
    id: string;
    nombre: string;
  }[];
}

export interface API_GetLocalities {
  departamentos: {
    id: string;
    nombre: string;
  }[];
}

export interface API_GetStreets {
  calles: {
    id: string;
    nombre: string;
  }[];
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface MinimalEmployee extends API_GetEmployees {}
export interface Employee extends API_GetEmployee {}
export interface EmployeeFolder extends API_GetEmployeeDocs {}
export interface EmployeeDoc extends API_EmployeeDocs {}
export interface History extends API_GetHistory {}
export interface Absence extends API_GetAbsences {}
export interface Vacation extends API_GetVacations {}
export interface License extends API_GetLicenses {}
export interface LicenseType extends API_GetLicensesTypes {}
export interface FormalWarning extends API_GetFormalWarnings {}
export interface Training extends API_GetTrainings {}
export interface TrainingType extends API_GetTrainingsTypes {}
export interface LateArrival extends API_GetLateArrivals {}
export interface ExtraHours extends API_GetExtraHours {}
export interface State extends BasicList {}
export interface Locality extends BasicList {}
export interface Street extends BasicList {}
export interface MinimalFamilyMember extends API_MinimalFamilyMember {}
export interface FamilyMember extends API_GetFamilyMember {}
export interface Beneficiary extends API_GetBeneficiary {}
