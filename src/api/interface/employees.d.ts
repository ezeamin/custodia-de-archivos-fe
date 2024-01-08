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
}

export interface API_GetEmployeeDocs {
  id: string;
  name: string;
  url: string;
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface MinimalEmployee extends API_GetEmployees {}
export interface Employee extends API_GetEmployee {}
export interface EmployeeDoc extends API_GetEmployeeDocs {}
