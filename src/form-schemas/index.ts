import { LoginSchemas } from './schemas/auth';
import { EmployeesSchemas } from './schemas/employees';
import { NotificationSchemas } from './schemas/notifications';
import { SettingsSchemas } from './schemas/settings';

import { TypesListSchemas } from './schemas/typesList';

/**
 * This folder should include all validations schemas across the project.
 * Each validation schema should be a zod object.
 * Each validation schema should be also exported as a type at the bottom of the file.
 * For handling TS support, it's necessary that, when adding a new validation schema, its type is joined at FormSchemas with the other types.
 */

/**
 * Type that joins all validation schemas.
 */

// Use | to join all validation schemas types.
export type FormSchemas =
  | EmployeesSchemas
  | LoginSchemas
  | NotificationSchemas
  | TypesListSchemas
  | SettingsSchemas;
