import {
  Absence,
  API_GetAbsences,
  API_GetEmployee,
  API_GetEmployeeDocs,
  API_GetEmployees,
  API_GetExtraHours,
  API_GetFamilyMember,
  API_GetFormalWarnings,
  API_GetHistory,
  API_GetLateArrivals,
  API_GetLicenses,
  API_GetLicensesTypes,
  API_GetLocalities,
  API_GetStates,
  API_GetStreets,
  API_GetTrainings,
  API_GetTrainingsTypes,
  API_GetVacations,
  Employee,
  EmployeeDoc,
  ExtraHours,
  FamilyMember,
  FormalWarning,
  History,
  LateArrival,
  License,
  LicenseType,
  Locality,
  MinimalEmployee,
  State,
  Street,
  Training,
  TrainingType,
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
  civilStatus: data.civilStatus,
  antiquity: data.antiquity,
  startDate: data.startDate,
  endDate: data.endDate,
  position: data.position,
  area: data.area,
  address: data.address,
  fileNumber: data.fileNumber,
  status: data.status,
  workingHours: data.workingHours,
  user: data.user,
  familyMembers: data.familyMembers,
});

export const getFamilyMemberInfoAdapter = (
  data: API_GetFamilyMember
): FamilyMember => ({
  id: data.id,
  name: data.name,
  lastname: data.lastname,
  dni: data.dni,
  gender: data.gender,
  phone: data.phone,
  address: data.address,
  relationship: data.relationship,
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

export const getEmployeeAbsencesAdapter = (
  data: API_GetAbsences[]
): Absence[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    reason: element.reason,
  }));
};

export const getEmployeeVacationsAdapter = (
  data: API_GetVacations[]
): Vacation[] => {
  return data.map((element) => ({
    id: element.id,
    startDate: element.startDate,
    endDate: element.endDate,
  }));
};

export const getEmployeeLicensesAdapter = (
  data: API_GetLicenses[]
): License[] => {
  return data.map((element) => ({
    id: element.id,
    startDate: element.startDate,
    endDate: element.endDate,
    observations: element.observations,
    type: {
      id: element.type.id,
      description: element.type.description,
    },
  }));
};

export const getEmployeeLicensesTypesAdapter = (
  data: API_GetLicensesTypes[]
): LicenseType[] => {
  return data.map((element) => ({
    id: element.id,
    title: element.title,
    description: element.description,
  }));
};

export const getEmployeeLicenseTypeAdapter = (
  data: API_GetLicensesTypes
): LicenseType => ({
  id: data.id,
  title: data.title,
  description: data.description,
});

export const getEmployeeFormalWarningsAdapter = (
  data: API_GetFormalWarnings[]
): FormalWarning[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    reason: element.reason,
  }));
};

export const getEmployeeTrainingsAdapter = (
  data: API_GetTrainings[]
): Training[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    reason: element.reason,
    observations: element.observations,
    type: {
      id: element.type.id,
      description: element.type.description,
    },
  }));
};

export const getEmployeeTrainingTypesAdapter = (
  data: API_GetTrainingsTypes[]
): TrainingType[] => {
  return data.map((element) => ({
    id: element.id,
    title: element.title,
    description: element.description,
  }));
};

export const getEmployeeTrainingTypeAdapter = (
  data: API_GetTrainingsTypes
): TrainingType => ({
  id: data.id,
  title: data.title,
  description: data.description,
});

export const getEmployeeLateArrivalsAdapter = (
  data: API_GetLateArrivals[]
): LateArrival[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    time: element.time,
    observations: element.observations,
  }));
};

export const getEmployeeExtraHoursAdapter = (
  data: API_GetExtraHours[]
): ExtraHours[] => {
  return data.map((element) => ({
    id: element.id,
    date: element.date,
    hours: element.hours,
    observations: element.observations,
  }));
};

export const getStatesAdapter = (data: API_GetStates): State[] => {
  return data.provincias
    .map((element) => ({
      id: element.id,
      description: element.nombre.toUpperCase(),
    }))
    .sort((a, b) => a.description.localeCompare(b.description));
};

export const getLocalitiesAdapter = (data: API_GetLocalities): Locality[] => {
  return (
    data.departamentos
      .map((element) => ({
        id: element.id,
        description: element.nombre.toUpperCase(),
      }))
      .sort((a, b) => a.description.localeCompare(b.description))
      // filter duplicate descriptions
      .filter(
        (element, index, self) =>
          index === self.findIndex((t) => t.description === element.description)
      )
  );
};

export const getStreetsAdapter = (data: API_GetStreets): Street[] => {
  return (
    data.calles
      .map((element) => ({
        id: element.id,
        description: element.nombre.toUpperCase(),
      }))
      .sort((a, b) => a.description.localeCompare(b.description))
      // filter duplicate descriptions
      .filter(
        (element, index, self) =>
          index === self.findIndex((t) => t.description === element.description)
      )
  );
};
