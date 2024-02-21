import { AreasTypeSchema } from './areasTypeSchema';
import { LicensesTypeSchema } from './licensesTypeSchema';
import { NotificationsTypeSchema } from './notificationsTypeSchema';
import { TrainingsTypeSchema } from './trainingsTypeSchema';

export type TypesListSchemas =
  | NotificationsTypeSchema
  | LicensesTypeSchema
  | TrainingsTypeSchema
  | AreasTypeSchema;
