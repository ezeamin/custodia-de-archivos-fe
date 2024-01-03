import { API_GetEmployees, Employee } from '@/api/interface/employees';

// TODO: Check if this information is all needed.
// Should we create one endpoint for finding one employee?

export const getEmployeesAdapter = (data: API_GetEmployees[]): Employee[] => {
  return data.map((employee) => ({
    id: employee.id,
    dni: employee.dni,
    imgSrc: employee.imgSrc,
    lastname: employee.lastname,
    firstname: employee.firstname,
    age: employee.age,
    antiquity: employee.antiquity,
    position: employee.position,
    area: employee.area,
    fileNumber: employee.fileNumber,
    status: employee.status,
  }));
};
