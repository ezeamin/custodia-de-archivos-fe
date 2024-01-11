import { LicenseTypeSchema } from './licensesTypeSchema';
import { NotificationTypeSchema } from './notificationTypeSchema';
import { TrainingTypeSchema } from './trainingsTypeSchema';

export type TypesListSchemas =
  | NotificationTypeSchema
  | LicenseTypeSchema
  | TrainingTypeSchema;
