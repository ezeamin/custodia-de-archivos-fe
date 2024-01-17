import { AddDocumentSchema } from './addDocumentSchema';
import { AddNewAbsenceSchema } from './addNewAbsenceSchema';
import { AddNewExtraHoursSchema } from './addNewExtraHoursSchema';
import { AddNewFormalWarningSchema } from './addNewFormalWarningSchema';
import { AddNewLateArrivalSchema } from './addNewLateArrivalSchema';
import { AddNewLicenseSchema } from './addNewLicenseSchema';
import { AddNewTrainingSchema } from './addNewTrainingSchema';
import { AddNewVacationSchema } from './addNewVacationSchema';
import { ChangeDocNameSchema } from './changeDocNameSchema';
import { CreateSchema } from './createSchema';
import { EditContactInfoSchema } from './editContactInfoSchema';
import { EditPersonalInfoSchema } from './editPersonalInfoSchema';
import { SearchSchema } from './searchSchema';

// Join other Employees schemas with "|"
export type EmployeesSchemas =
  | SearchSchema
  | CreateSchema
  | ChangeDocNameSchema
  | AddDocumentSchema
  | AddNewAbsenceSchema
  | AddNewLateArrivalSchema
  | AddNewLicenseSchema
  | AddNewExtraHoursSchema
  | AddNewVacationSchema
  | AddNewFormalWarningSchema
  | AddNewTrainingSchema
  | EditPersonalInfoSchema
  | EditContactInfoSchema;
