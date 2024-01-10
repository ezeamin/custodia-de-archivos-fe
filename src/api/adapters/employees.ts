import {
  Absence,
  API_GetAbsences,
  API_GetEmployee,
  API_GetEmployeeDocs,
  API_GetEmployees,
  API_GetFormalWarnings,
  API_GetHistory,
  API_GetLateArrivals,
  API_GetLicenses,
  API_GetLicensesTypes,
  API_GetTrainings,
  API_GetTrainingsTypes,
  API_GetVacations,
  API_PostUser,
  Employee,
  EmployeeDoc,
  FormalWarning,
  History,
  LateArrival,
  License,
  LicenseType,
  MinimalEmployee,
  Training,
  TrainingType,
  User,
  Vacation,
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
  user: data.user,
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

export const postUserAdapter = (data: API_PostUser): User => ({
  username: data.username,
  password: data.password,
});

export const getEmployeeAbsencesAdapter = (
  data: API_GetAbsences[]
): Absence[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    reason: element.reason,
  }));
};

export const getEmployeeAbsenceAdapter = (data: API_GetAbsences): Absence => ({
  id: data.id,
  date: data.date,
  reason: data.reason,
});

export const getEmployeeVacationsAdapter = (
  data: API_GetVacations[]
): Vacation[] => {
  return data.map((element) => ({
    id: element.id,
    startDate: element.startDate,
    endDate: element.endDate,
  }));
};

export const getEmployeeVacationAdapter = (
  data: API_GetVacations
): Vacation => ({
  id: data.id,
  startDate: data.startDate,
  endDate: data.endDate,
});

export const getEmployeeLicensesAdapter = (
  data: API_GetLicenses[]
): License[] => {
  return data.map((element) => ({
    id: element.id,
    startDate: element.startDate,
    endDate: element.endDate,
    type: {
      id: element.type.id,
      description: element.type.description,
    },
  }));
};

export const getEmployeeLicenseAdapter = (data: API_GetLicenses): License => ({
  id: data.id,
  startDate: data.startDate,
  endDate: data.endDate,
  type: {
    id: data.type.id,
    description: data.type.description,
  },
});

export const getEmployeeLicencesTypesAdapter = (
  data: API_GetLicensesTypes[]
): LicenseType[] => {
  return data.map((element) => ({
    id: element.id,
    description: element.description,
  }));
};

export const getEmployeeFormalWarningsAdapter = (
  data: API_GetFormalWarnings[]
): FormalWarning[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    reason: element.reason,
  }));
};

export const getEmployeeFormalWarningAdapter = (
  data: API_GetFormalWarnings
): FormalWarning => ({
  id: data.id,
  date: data.date,
  reason: data.reason,
});

export const getEmployeeTrainingsAdapter = (
  data: API_GetTrainings[]
): Training[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    reason: element.reason,
    type: {
      id: element.type.id,
      description: element.type.description,
    },
  }));
};

export const getEmployeeTrainingTypesAdapter = (
  data: API_GetTrainingsTypes
): TrainingType => ({
  id: data.id,
  description: data.description,
});

export const getEmployeeTrainingAdapter = (
  data: API_GetTrainings
): Training => ({
  id: data.id,
  date: data.date,
  reason: data.reason,
  type: {
    id: data.type.id,
    description: data.type.description,
  },
});

export const getEmployeeLateArrivalsAdapter = (
  data: API_GetLateArrivals[]
): LateArrival[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
  }));
};

export const getEmployeeLateArrivalAdapter = (
  data: API_GetLateArrivals
): LateArrival => ({
  id: data.id,
  date: data.date,
});
