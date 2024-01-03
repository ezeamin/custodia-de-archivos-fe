// ----------------------------------------------------------------------
// API
// ----------------------------------------------------------------------

export interface API_GetEmployees {
  id: string;
  dni: string;
  imgSrc: string;
  lastname: string;
  firstname: string;
  age: number;
  antiquity: number;
  position: string;
  area: string;
  fileNumber: number;
  status: 'active' | 'suspended' | 'inactive';
}

// ----------------------------------------------------------------------
// Adapters
// ----------------------------------------------------------------------

export interface Employee extends API_GetEmployees {}
