import { generateRandomId } from '@/utilities/utils';

import { LicenseType } from '@/api/interface/employees';

const typeDescriptions = [
  'Licencia por maternidad',
  'Licencia por paternidad',
  'Licencia médica',
  'Licencia de estudio',
  'Licencia especial',
  'Licencia sin goce de sueldo',
  'Permiso por duelo',
  'Licencia por mudanza',
  'Licencia remunerada',
];
const generateMockedLicensesTypes = () => {
  const newArr = typeDescriptions.map((license) => ({
    id: generateRandomId(),
    title: license,
    description: 'Descripción de prueba',
  }));

  return { data: newArr };
};

export const mockedTypesList: { data: LicenseType[] } =
  generateMockedLicensesTypes();
