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
  area: {
    id: string;
    description: string;
  };
  fileNumber: number;
  status: {
    id: string;
    description: 'active' | 'suspended' | 'inactive';
  };
}

// ----------------------------------------------------------------------
// ADAPTERS
// ----------------------------------------------------------------------

export interface Employee extends API_GetEmployees {}
