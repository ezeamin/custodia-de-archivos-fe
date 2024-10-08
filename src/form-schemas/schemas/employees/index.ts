import { AddDocumentSchema } from './addDocumentSchema';
import { AddFolderSchema } from './addFolderSchema';
import { AddLifeInsuranceSchema } from './addLifeInsuranceSchema';
import { AddNewAbsenceSchema } from './addNewAbsenceSchema';
import { AddNewExtraHoursSchema } from './addNewExtraHoursSchema';
import { AddNewFormalWarningSchema } from './addNewFormalWarningSchema';
import { AddNewLateArrivalSchema } from './addNewLateArrivalSchema';
import { AddNewLicenseSchema } from './addNewLicenseSchema';
import { AddNewTrainingSchema } from './addNewTrainingSchema';
import { AddNewVacationSchema } from './addNewVacationSchema';
import { BeneficiaryFormSchema } from './beneficiaryFormSchema';
import { ChangeDocNameSchema } from './changeDocNameSchema';
import { CreateSchema } from './createSchema';
import { EditContactInfoSchema } from './editContactInfoSchema';
import { EditHealthInfoSchema } from './editHealthInfoSchema';
import { EditImageSchema } from './editImageSchema';
import { EditJobInfoSchema } from './editJobInfoSchema';
import { EditPersonalInfoSchema } from './editPersonalInfoSchema';
import { FamilyMemberFormSchema } from './familyMemberFormSchema';
import { SearchDocumentSchema } from './searchDocumentSchema';
import { SearchSchema } from './searchSchema';

// Join other Employees schemas with "|"
export type EmployeesSchemas =
  | SearchSchema
  | CreateSchema
  | ChangeDocNameSchema
  | AddFolderSchema
  | AddDocumentSchema
  | AddNewAbsenceSchema
  | AddNewLateArrivalSchema
  | AddNewLicenseSchema
  | AddNewExtraHoursSchema
  | AddNewVacationSchema
  | AddNewFormalWarningSchema
  | AddNewTrainingSchema
  | EditPersonalInfoSchema
  | EditContactInfoSchema
  | EditJobInfoSchema
  | EditImageSchema
  | FamilyMemberFormSchema
  | AddLifeInsuranceSchema
  | EditHealthInfoSchema
  | BeneficiaryFormSchema
  | SearchDocumentSchema;
