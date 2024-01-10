import {
  API_GetEmployee,
  API_GetEmployeeDocs,
  API_GetEmployees,
  API_GetHistory,
  Employee,
  EmployeeDoc,
  History,
  MinimalEmployee,
} from '@/api/interface/employees';

// TODO: Check if this information is all needed.

export const getEmployeesAdapter = (
  data: API_GetEmployees[]
): MinimalEmployee[] => {
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

export const getEmployeeAdapter = (data: API_GetEmployee): Employee => ({
  id: data.id,
  dni: data.dni,
  imgSrc: data.imgSrc,
  lastname: data.lastname,
  firstname: data.firstname,
  birthdate: data.birthdate,
  phone: data.phone,
  email: data.email,
  age: data.age,
  gender: data.gender,
  antiquity: data.antiquity,
  registrationDate: data.registrationDate,
  departureDate: data.departureDate,
  position: data.position,
  area: data.area,
  address: data.address,
  fileNumber: data.fileNumber,
  status: data.status,
});

export const getEmployeeDocsAdapter = (
  data: API_GetEmployeeDocs[]
): EmployeeDoc[] => {
  return data.map((doc) => ({
    id: doc.id,
    name: doc.name,
    url: doc.url,
  }));
};

export const getEmployeeHistoryAdapter = (
  data: API_GetHistory[]
): History[] => {
  return data.map((element) => ({
    id: element.id,
    previousValue: element.previousValue,
    newValue: element.newValue,
    field: element.field,
    date: element.date,
    user: {
      id: element.user.id,
      description: element.user.description,
    },
  }));
};
